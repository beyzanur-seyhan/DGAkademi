import {object, string, number} from 'yup';

const validation = object({
    cardNumber: number().typeError("harf içeremez!").min(19, "19 karakter olmalı!").required("gerekli!"),
    fullName: string().min(5, "5 karakterden fazla olmalı!").matches(/^[aA-zZ\s\ş\ü\ö\ç\ğ\İ]/, "işaret / sayı olamaz!").trim().required("gerekli!"),
    expiryMonth: string().required("ay gerekli!"),
    expiryYear: string().required("yıl gerekli"),
    cvv: string().max(3, "3 karakter olmalı!").min(3, "3 karakter olmalı!").required("gerekli!")
});

export default validation;