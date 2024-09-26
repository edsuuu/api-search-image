import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
class ImageController {
    constructor() {
        this.searchImage = this.searchImage.bind(this);
    }

    // metodo para procurar a imagem
    searchImage(req: Request, res: Response) {
        const { companyID, fileName } = req.params;

        console.log(companyID, fileName);

        const pathFolder = this.searchFolder(companyID);

        console.log(pathFolder);

        if (!pathFolder) {
            return res.status(404).json({ message: `Pasta "${companyID}" não encontrada.` });
        }

        const file = this.searchFileName(pathFolder, fileName);

        console.log(file);

        if (!file) {
            return res.status(404).json({ message: `Arquivo "${fileName}" não encontrado na pasta "${companyID}".` });
        }

        res.status(200).sendFile(file);
    }

    searchImageFromBrands(req: Request, res: Response) {
        const { companyID, fileName } = req.params;

        const directoryBrands = path.join(__dirname, `${process.env.IMAGES_DIRECTORY}/${companyID}/brands/${fileName}`);
        console.log(directoryBrands);

        res.status(200).sendFile(directoryBrands)
    }

    // metodo para procurar a pasta
    searchFolder(folderName: string) {
        const directory = path.join(__dirname, `${process.env.IMAGES_DIRECTORY}`);

        if (!directory) return 'Pasta Nao criada';

        const folers = fs.readdirSync(directory);

        const folderFound = folers.find((pasta) => {
            const pathFolder = path.join(directory, pasta);
            return fs.lstatSync(pathFolder).isDirectory() && pasta === folderName;
        });

        return folderFound ? path.join(directory, folderFound) : null;
    }


    searchFileName(pathFolder: string, fileName: string) {
        const arquivos = fs.readdirSync(pathFolder);

        const arquivoEncontrado = arquivos.find((arquivo) => arquivo === fileName);

        return arquivoEncontrado ? path.join(pathFolder, arquivoEncontrado) : null;
    }
}

export default new ImageController();
