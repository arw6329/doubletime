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
    const program = ts.createProgram({ options, rootNames: fileNames, configFileParsingDiagnostics: errors })

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

        exportedTypes[exported.text[0].text] = checker.typeToString(
            checker.getTypeOfSymbolAtLocation(symbol, node),
            undefined,
            ts.TypeFormatFlags.NoTruncation
        )
    }
}