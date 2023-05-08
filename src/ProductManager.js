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

    async updateProduct(id, { title, description, price, thumbnail, code, stock }) {
        const prodsJSON = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJSON)
        if (prods.some(prod => prod.id === parseInt(id))) {
            let index = prods.findIndex(prod => prod.id === parseInt(id))
            prods[index].title = title
            prods[index].description = description
            prods[index].price = price
            prods[index].thumbnail = thumbnail
            prods[index].code = code
            prods[index].stock = stock
            await fs.writeFile(this.path, JSON.stringify(prods))
            return "Producto actualizado"
        } else {
            return "Producto no encontrado"
        }
    }
    

    getProducts = async () => {
        const respuesta2 = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(respuesta2)
    }

    getProductsById = async (id) => {
        let respuesta0 = await fs.readFile(this.path, 'utf-8')
        let respuesta3 = JSON.parse(respuesta0)
        if (respuesta3.find(product => product.id == id)){
            return(respuesta3.find(product => product.id == id));
        }else{
            return "Producto no encontrado"
        }
    }
        
    async deleteProductById(id) {
        const prodsJSON = await fs.readFile(this.path, 'utf-8')
        const prods = JSON.parse(prodsJSON)
        if (prods.some(prod => prod.id === parseInt(id))) {
            const prodsFiltrados = prods.filter(prod => prod.id !== parseInt(id))
            await fs.writeFile(this.path, JSON.stringify(prodsFiltrados))
            return "Producto eliminado"
        } else {
            return "Producto no encontrado"
        }
    }
    }
