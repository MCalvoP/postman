import {promises as fs} from 'fs'

export class ProductManager {
    constructor(path){
        this.path = path
        this.products = []
    }

    static id = 0

    addProduct = async (title, description, price, img, code, stock) => {
       
        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            id : ProductManager.id
        }

        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products))
    }

    readProducts = async () =>{
        let respuesta = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(respuesta)
    }
    

    getProducts = async () => {
        const respuesta2 = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(respuesta2)
    }

    getProductsById = async (id) => {
        const respuesta0 = await fs.readFile(this.path, 'utf-8')
        const respuesta3 = JSON.parse(respuesta0)
        if (respuesta3.find(product => product.id == id)){
            return(respuesta3.find(product => product.id == id));
        }else{
            return "Producto no encontrado"
        }
    }
        
     deleteProductById = async (id) =>{
         let respuesta3 = await this.readProducts()
         let productFilter = respuesta3.filter(products => products.id != id)
         await fs.writeFile(this.path, JSON.stringify(productFilter))
         return "Producto eliminado"
     }
    }
