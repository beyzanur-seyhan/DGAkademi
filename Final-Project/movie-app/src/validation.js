import {object, string, number} from 'yup';

const validation = object({
    cardNumber: number().typeError("harf içeremez!").min(19, "19 karakter olmalı!").required("gerekli!"),
    fullName: string().min(5, "5 karakterden fazla olmalı!").matches(/^(?:([A-Za-z\sşŞüÜöÖçÇğĞİ\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)) (?:([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*))$/g,'tam isim gerekli!').trim().required("gerekli!"),
    expiryMonth: string().required("ay gerekli!"),
    expiryYear: string().required("yıl gerekli"),
    cvv: string().max(3, "3 karakter olmalı!").min(3, "3 karakter olmalı!").required("gerekli!")
});

export default validation;