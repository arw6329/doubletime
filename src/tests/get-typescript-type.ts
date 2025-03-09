import ts from "typescript"

type Types = { [exportName: string]: string }

export function getTypes(filepath: string): Types {
    const projectDir = __dirname + '/../..'
    const configFile = ts.findConfigFile(projectDir, ts.sys.fileExists, 'tsconfig.json')
	if (!configFile) {
        throw Error('tsconfig.json not found')
    }
	const { config } = ts.readConfigFile(configFile, ts.sys.readFile)
	const { options, fileNames, errors } = ts.parseJsonConfigFileContent(config, ts.sys, projectDir)
    const program = ts.createProgram({ 
        options,
        rootNames: fileNames,
        configFileParsingDiagnostics: errors
    })

    const emitResult = program.emit()
    const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics)
    allDiagnostics.forEach((diagnostic) => {
        if (diagnostic.file) {
            const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        } else {      
            console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
        }
    })

    const exportedTypes: Types = {}

    const sourceFile = program.getSourceFile(filepath)
    if (!sourceFile) {
        throw new Error(`Could not load source file ${filepath}`)
    }

    const checker = program.getTypeChecker()
    ts.forEachChild(sourceFile, visit)

    return exportedTypes

    function visit(node: ts.Node) {
        node.getChildren(sourceFile).map(visit)

        const symbol = checker.getSymbolAtLocation(node)
        if (!symbol) {
            return
        }

        const exported = symbol.getJsDocTags().find(x => x.name === "export")
        if (!exported || !exported.text) {
            return
        }

        const type = checker.getTypeOfSymbolAtLocation(symbol, node)
        exportedTypes[exported.text[0].text] = type.flags & ts.TypeFlags.Never
            ? 'never'
            : checker.typeToString(
                type,
                undefined,
                ts.TypeFormatFlags.NoTruncation
            )
    }
}