import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

class ImageController {
    constructor() {
        this.searchImage = this.searchImage.bind(this);
    }

    searchImage(req: Request, res: Response) {
        const { nomePasta, nomeArquivo } = req.params;

        console.log(nomePasta, nomeArquivo);

        const caminhoPasta = this.procurarPasta(nomePasta);

        console.log(caminhoPasta);

        if (!caminhoPasta) {
            return res.status(404).json({ message: `Pasta "${nomePasta}" não encontrada.` });
        }

        const caminhoArquivo = this.procurarArquivo(caminhoPasta, nomeArquivo);

        console.log(caminhoArquivo);

        if (!caminhoArquivo) {
            return res.status(404).json({ message: `Arquivo "${nomeArquivo}" não encontrado na pasta "${nomePasta}".` });
        }

        res.status(200).sendFile(caminhoArquivo);
    }

    procurarPasta(nomePasta: string) {
        const directory = path.join(__dirname, '../../imagens');

        if (!directory) return 'Pasta Nao criada';

        const pastas = fs.readdirSync(directory);

        const folderFound = pastas.find((pasta) => {
            const pathFolder = path.join(directory, pasta);
            return fs.lstatSync(pathFolder).isDirectory() && pasta === nomePasta;
        });

        return folderFound ? path.join(directory, folderFound) : null;
    }

    procurarArquivo(caminhoPasta: string, nomeArquivo: string) {
        const arquivos = fs.readdirSync(caminhoPasta);

        const arquivoEncontrado = arquivos.find((arquivo) => arquivo === nomeArquivo);

        return arquivoEncontrado ? path.join(caminhoPasta, arquivoEncontrado) : null;
    }
}

export default new ImageController();
