import ProductManager from "../persistencia/dao/managers/productManagerMongo.js";
import {usersModel} from "../persistencia/dao/models/users.model.js";
import CustomError from "../errors/CustomError.js";
import {errorMessages} from "../errors/error.enum.js";

class ProductService {

    constructor() {
        this.product = new ProductManager();
    }

    addProduct = async (product) => {
        try {
            if (!product.title || !product.description || !product.price || !product.thumbnail || !product.category || !product.stock || !product.code || !product.owner) {
                const customError = CustomError.createError(errorMessages.MISSING_DATA);
                return { error: customError.message };
            }
    
            const verifyCode = await this.product.getProductByCode(product.code);
            if (verifyCode) {
                return { error: "El código se repite" };
            }
    
            // Verifica si el usuario es premium o admin
            if (product.owner !== 'admin') {
                const user = await usersModel.findOne({ email: product.owner });
                if (!user || (user.role !== 'admin' && user.role !== 'premium')) {
                    console.log(user.role)
                    return { error: 'El campo "owner" debe ser un usuario premium o "admin"' };
                }
            }

    
            const addedProduct = await this.product.addProduct(product);
            return addedProduct;
        } catch (error) {
            return { error: error.message };
        }
    };
    

    getProduct = async (id) => {
        const product = await this.product.getProductById(id);
        const newProduct = { id: product._id, title: product.title, description: product.description, price: product.price, stock: product.stock, thumbnail: product.thumbnail, category: product.category, owner: product.owner}
        return newProduct;
    }

    getProducts = async (params) => {
        const options = {
          page: Number(params.query.page) || 1,
          limit: Number(params.query.limit) || 20,
          sort: { price: Number(params.query.sort) }
        };
      
        if (!(options.sort.price === -1 || options.sort.price === 1)) {
          delete options.sort
        }
      
        const categories = await this.product.categories()
        const result = categories.some(categ => categ === params.category)
        
        if (result) {
          return await this.product.getProducts({ category: params.category }, options);
        }
      
        return await this.product.getProducts({}, options);
    }

    updateProduct = async (id, product) => {
        const updateProduct = await this.product.updateProduct(id, product);
        return 'Producto Actualizado';
    };

    deleteProduct = async (pid) => {
        const deleteProduct = await this.product.deleteProduct(pid);
        if (deleteProduct) {
            return 'Producto Eliminado';
        } else {
            return 'Producto no encontrado';
        }
    };

}

export default ProductService