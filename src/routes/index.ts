import { Router } from "express";
import application_form from "../controller/application_form";
import sertificat from "../controller/sertificat";
import company from "../controller/company";
import news from "../controller/news";
import admin from "../controller/admin";
import news_form from "../controller/news_form";
import category_apparat from "../controller/category_apparat";
import category_pereparat from "../controller/category_pereparat";
import pereparat from "../controller/pereparat";
import partners from "../controller/partners";
import aparat from "../controller/aparat";
import description from "../controller/description";
import sample from "../controller/sample";
import photos from "../controller/photos";
import design from "../controller/design";
import parametr from "../controller/parametr";
import checkToken from "../middlewares/checkToken";
import category_cosmetics from "../controller/category_cosmetics";
import cosmetics from "../controller/cosmetics";

const router = Router()

// route application_form
router.get("/application_form",application_form.Get);
router.get("/application_form/:id",application_form.GetId);
router.post("/application_form",application_form.Post);
router.put("/application_form/:id",checkToken,application_form.Put);
router.delete("/application_form/:id",checkToken,application_form.Delete);

// route sertificat
router.get("/sertificat",sertificat.Get);
router.get("/sertificat/:id",sertificat.GetId);
router.post("/sertificat",checkToken,sertificat.Post);
router.put("/sertificat/:id",checkToken,sertificat.Put);
router.delete("/sertificat/:id",checkToken,sertificat.Delete);

// route company
router.get("/company",company.Get);
router.get("/company/:id",company.GetId);
router.post("/company",checkToken,company.Post);
router.put("/company/:id",checkToken,company.Put);
router.delete("/company/:id",checkToken,company.Delete);

// route news
router.get("/news",news.Get);
router.get("/news/:id",news.GetId);
router.post("/news",checkToken,news.Post);
router.put("/news/:id",checkToken,news.Put);
router.delete("/news/:id",checkToken,news.Delete);

// route admin
router.get("/admins",admin.Get);
router.get("/admins/:id",admin.GetId);
router.post("/admins",checkToken,admin.Post);
router.post("/signin",admin.SignIn);
router.put("/admins/:id",checkToken,admin.Put);
router.delete("/admins/:id",checkToken,admin.Delete);

// route news_form
router.get("/news_form",news_form.Get);
router.get("/news_form/:id",news_form.GetId);
router.post("/news_form",news_form.Post);
router.put("/news_form/:id",checkToken,news_form.Put);
router.delete("/news_form/:id",checkToken,news_form.Delete);

// route category_aparat
router.get("/category_aparat",category_apparat.Get);
router.get("/category_aparat/:id",category_apparat.GetId);
router.post("/category_aparat",checkToken,category_apparat.Post);
router.put("/category_aparat/:id",checkToken,category_apparat.Put);
router.delete("/category_aparat/:id",checkToken,category_apparat.Delete);

// route category_pereparat
router.get("/category_pereparat",category_pereparat.Get);
router.get("/category_pereparat/:id",category_pereparat.GetId);
router.post("/category_pereparat",checkToken,category_pereparat.Post);
router.put("/category_pereparat/:id",checkToken,category_pereparat.Put);
router.delete("/category_pereparat/:id",checkToken,category_pereparat.Delete);

// route category_cosmetics
router.get("/category_cosmetics",category_cosmetics.Get);
router.get("/category_cosmetics/:id",category_cosmetics.GetId);
router.post("/category_cosmetics",checkToken,category_cosmetics.Post);
router.put("/category_cosmetics/:id",checkToken,category_cosmetics.Put);
router.delete("/category_cosmetics/:id",checkToken,category_cosmetics.Delete);

// route pereparat
router.get("/pereparat",pereparat.Get);
router.get("/pereparat/:id",pereparat.GetId);
router.post("/pereparat",checkToken,pereparat.Post);
router.put("/pereparat/:id",checkToken,pereparat.Put);
router.delete("/pereparat/:id",checkToken,pereparat.Delete);

// route partners
router.get("/partners",partners.Get);
router.get("/partners/:id",partners.GetId);
router.post("/partners",checkToken,partners.Post);
router.put("/partners/:id",checkToken,partners.Put);
router.delete("/partners/:id",checkToken,partners.Delete);

// route aparat
router.get("/aparat",aparat.Get);
router.get("/aparat/:id",aparat.GetId);
router.post("/aparat",checkToken,aparat.Post);
router.put("/aparat/:id",checkToken,aparat.Put);
router.delete("/aparat/:id",checkToken,aparat.Delete);

// route descriptions
router.get("/descriptions",description.Get);
router.get("/descriptions/:id",description.GetId);
router.post("/descriptions",checkToken,description.Post);
router.put("/descriptions/:id",checkToken,description.Put);
router.delete("/descriptions/:id",checkToken,description.Delete);

// route cosmetics
router.get("/cosmetics",cosmetics.Get);
router.get("/cosmetics/:id",cosmetics.GetId);
router.post("/cosmetics",checkToken,cosmetics.Post);
router.put("/cosmetics/:id",checkToken,cosmetics.Put);
router.delete("/cosmetics/:id",checkToken,cosmetics.Delete);

// route sample
router.get("/sample",sample.Get);
router.get("/sample/:id",sample.GetId);
router.post("/sample",checkToken,sample.Post);
router.put("/sample/:id",checkToken,sample.Put);
router.delete("/sample/:id",checkToken,sample.Delete);

// route photos
router.get("/photos",photos.Get);
router.get("/photos/:id",photos.GetId);
router.post("/photos",checkToken,photos.Post);
router.put("/photos/:id",checkToken,photos.Put);
router.delete("/photos/:id",checkToken,photos.Delete);

// route design
router.get("/design",design.Get);
router.get("/design/:id",design.GetId);
router.post("/design",checkToken,design.Post);
router.put("/design/:id",checkToken,design.Put);
router.delete("/design/:id",checkToken,design.Delete);

// route parametr
router.get("/parametr",parametr.Get);
router.get("/parametr/:id",parametr.GetId);
router.post("/parametr",checkToken,parametr.Post);
router.put("/parametr/:id",checkToken,parametr.Put);
router.delete("/parametr/:id",checkToken,parametr.Delete);

export default router;
