import * as path from "path";
import * as xlsx from "xlsx";

class ExcelFile {
  private readonly UPLOADS_DIRECTORY = path.join(
    __dirname,
    "..",
    "..",
    "uploads",
  );
  private keys: string[];
  private rows: string[];
  private sizeRows: number;

  constructor() {
    this.keys = this.keys;
    this.rows = this.rows;
    this.sizeRows = this.sizeRows;
  }

  // Get methods
  getRows() {
    return this.rows;
  }

  getKeys() {
    return this.keys;
  }

  getSizeRows() {
    return this.sizeRows;
  }
  // Set methods
  setRows(rows: string[]) {
    this.rows = rows;
  }

  setKeys(keys: string[]) {
    this.keys = keys;
  }

  setSizeRows(sizeRows: number) {
    this.sizeRows = sizeRows;
  }

  absolutePathFile(fileName: string) {
    return path.join(this.UPLOADS_DIRECTORY, fileName);
  }

  relativePathFile(fileName: string) {
    return "../../uploads/" + fileName;
  }

  readExcel(fileName: string) {
    try {
      const workbook = xlsx.readFile(this.absolutePathFile(fileName));
      const sheetName = workbook.SheetNames[0]; // solo para a primera hoja
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(worksheet);

      // Parsing data
      const modifiedData = jsonData.map((row: any) => {
        const modifiedRow: any = {};
        for (const key in row) {
          if (row.hasOwnProperty(key)) {
            const modifiedKey = key.trim().toLowerCase().replace("  ", " ");
            modifiedRow[modifiedKey] = row[key]
              .toString()
              .trim()
              .toLowerCase()
              .replace("  ", " ");
          }
        }
        return modifiedRow;
      });

      const keys = Object.keys(jsonData[0]).map((key) =>
        key.trim().toLowerCase(),
      );

      // set values
      this.setRows(modifiedData);
      this.setKeys(keys);
      this.setSizeRows(modifiedData.length);
    } catch (error) {
      if (error.code == "ENOENT") {
        throw new Error("No se encontró el archivo excel para su lectura");
      }
      throw new Error("Error al leer el archivo excel");
    }
  }

  getAllDataFile() {
    return { rows: this.rows, keys: this.keys, sizeRows: this.sizeRows };
  }

  groupBy(columns: string[]) {
    const resultados = {};

    this.rows.forEach((objeto) => {
      const clave = columns.map((columna) => objeto[columna]).join("_._");
      if (resultados[clave]) {
        resultados[clave]++;
      } else {
        resultados[clave] = 1;
      }
    });
    // Realiza el formato de datos {name, value}
    const resultado = Object.keys(resultados).map((clave) => {
      const splitName = clave.includes("_._") ? clave.split("_._") : clave;
      let newName: string | string[];

      if (Array.isArray(splitName)) {
        newName = splitName.map((val) => (val ? val : "Sin respuesta"));
      } else {
        newName = splitName ? splitName : "Sin respuesta";
      }

      return {
        name: newName,
        value: resultados[clave],
        percentage: (resultados[clave] / this.getSizeRows()) * 100,
      };
    });
    return { resut: resultado, columns, description: "" };
  }
}

export { ExcelFile };
