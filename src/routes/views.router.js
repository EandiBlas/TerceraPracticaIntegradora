import UserDTO from '../persistencia/dto/user.dto.js';
import { Router } from 'express';
import ProductManager from "../persistencia/dao/managers/productManagerMongo.js"
import UsersManager from "../persistencia/dao/managers/userManagerMongo.js"
import { privateAcces, publicAcces,premiumOrAdminAccess, userAccess } from '../middlewares/middlewares.js'

const pm = new ProductManager()

const um = new UsersManager()

const router = Router()


router.get("/", async (req, res) => {
    res.render('login')

})

router.get("/products", async (req, res) => {
    const listadeproductos = await pm.getProductsView()
    res.render("products", { listadeproductos })
})

router.get("/realtimeproducts", premiumOrAdminAccess, (req, res) => {
    res.render("realtimeproducts")
})

router.get("/chat", privateAcces,userAccess, (req, res) => {
    res.render("chat")
})

router.get("/register", publicAcces, (req, res) => {
    res.render("register")
})

router.get("/login", publicAcces, (req, res) => {
    res.render("login")
})

router.get('/current', privateAcces, async (req, res) => {
    const user = await um.findUser(req.session.username);
    const userDTO = new UserDTO(user);
    res.render('current', { user: userDTO });
});

router.get("/forgot-password", publicAcces, (req, res) => {
    res.render("forgot-password")
})

router.get("/reset-password", publicAcces, (req, res) => {
    res.render("reset-password")
})

router.get("/create-product-panel", premiumOrAdminAccess, (req, res) => {
    res.render("create-product-panel")
})

export default router