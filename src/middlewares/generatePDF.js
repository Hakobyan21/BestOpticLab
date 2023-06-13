import PDFDocument from 'pdfkit';
import fs from 'fs';
import moment from 'moment';
import { superAdminModel } from '../models';
// import { log } from 'console';

const fontSize = 12;
const lineHeight = 15;

const x = 25;
let y = 150;
let z = 0;
let k =0;

class GeneratePDF {
    static async generateingPDF() {
    // const arrFromInserting = []
        const doc = new PDFDocument();
        const path = 'pdfFiles';
        let columns;
        let values = [];
        const pdfData = await superAdminModel.getPDF();
        // console.log(pdfData);
        const title = 'ENGINED_AM';
        // const imagePath = "path/to/your/image.png"; 

        // doc.image(imagePath, {
        //     fit: [100, 100], // set the width and height of the image
        //     align: 'right',
        //     valign: 'top',
        //     absolutePosition: { x: 500, y: 50 } // set the position of the image
        //   });
        doc.fillColor('red');
        doc.text(title, { width: 140, height: lineHeight, align: 'left', valign: 'top', fontSize: 20, fontWeight: 'bold',});

        for (let i = 0; i < pdfData.length; i++) {
            for (let j = 0; j < pdfData[i].length; j++) {
                const obj = pdfData[i][j];
                columns = Object.keys(obj);
                values.push(Object.values(obj));
            }
        }
        let headArr = [];
        console.log(columns);
        columns.shift();
        // Draw the header row of the table
        function removeDuplicates(arr1) {
            for (let i = 0; i < arr1.length; i++) {
                if (!headArr.includes(arr1[i][0])) {
                    headArr.push(arr1[i][0]);
                }
            }
            return headArr;
        }

        console.log(removeDuplicates(values));
        headArr.map((headArr,i) => {
            // Draw the cell as a rectangle

            doc.fillColor('#cfe4f8');
            doc.rect(x , y , 150*columns.length,lineHeight).fillAndStroke();
            // Draw the text in the cell
            doc.fillColor('red');

            doc.text(headArr, x + 5, y + 5, { 
                width: 150*columns.length,
                height: lineHeight,
                align: 'center',
                valign: 'top',
                fontSize: 20,
                fontWeight: 'bold',
            });
            y += lineHeight;
     
            columns.map((headArr,i) => {
                // Draw the cell as a rectangle
      
                doc.rect(x + (i * 150), y, 150, lineHeight).stroke();
        
                // Draw the text in the cell
                doc.fillColor('red');
                doc.text(headArr, x + (i * 150) + 5, y + 5, { 
                    width: '100%',
                    height: lineHeight,
                    align: 'left',
                    valign: 'top',
                    fontSize: 20,
                    fontWeight: 'bold',
                });
            });
            y += lineHeight;
            let z =0;

            values.map(row => {
                // console.log(row);
                if(row[0] == headArr){
                    row.shift();
                    row.map((cell, j) => {
                        doc.rect(x + (j * 150), y+z-(k * 15), 150, lineHeight).stroke();
                        doc.fillColor('black');

                        doc.text(cell === null ? '-' : cell.toString(), x + (j * 150) + 5,  z+y+5-(k*15), { 
                            width: 140,
                            height: lineHeight,
                            align: 'left',
                            valign: 'top',
                            fontSize: fontSize
                        });
                    });
                }
                z +=15;
            });
            y +=lineHeight;
            k++;


        });

        const directory = './pdfFiles';
        const fileName = `table-${moment().format('YYYY-MM-DD-HHmmss')}.pdf`;
        if (!fs.existsSync(directory)){
            fs.mkdirSync(directory);
        }
        const filePath = `${directory}/${fileName}`;
        doc.pipe(fs.createWriteStream(filePath));
        doc.end();

        console.log(`PDF file generated: ${fileName}`);
        // arrFromInserting.push(filePath)
        return filePath;
    }
}

export default GeneratePDF;
