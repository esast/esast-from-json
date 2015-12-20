import Program, { ImportSpecifierAbstract, ExportSpecifier, ModuleDeclaration } from 'esast/lib/Program';
import Op from 'op/Op';
export default function fromProgram(_: any): Program;
export declare function opFromModuleDeclaration(_: any): ModuleDeclaration;
export declare function opFromImportSpecifierAbstract(_: any): Op<ImportSpecifierAbstract>;
export declare function fromExportSpecifier(_: any): ExportSpecifier;
