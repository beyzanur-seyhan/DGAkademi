import { useFormik } from "formik";
import { useState } from "react";
import imgBackPageBlack from "../assets/img/icons/back-page-black-icon.svg"
import validationSchema from "../validation";
import "../assets/css/buy-now.css";
import imgSuccessIcon from "../assets/img/icons/success-icon.svg";

function BuyNowMovie({ setDisplay }) {

    const [msgScss, OpenMsgSuccess] = useState("d-none");

    const CloseTheBuyNow = () => {
        setDisplay("msg-box-hide");
    }

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            cardNumber: '',
            fullName: '',
            expiryMonth: '',
            expiryYear: '',
            cvv: ''
        },
        validationSchema,
    });

    const OpenSuccessMessage = () => {
        if ((!(errors.cardNumber) && touched.cardNumber)) {
            if ((!(errors.fullName) && touched.fullName)) {
                if ((!(errors.expiryMonth) && touched.expiryMonth)) {
                    if ((!(errors.expiryYear) && touched.expiryYear)) {
                        if ((!(errors.cvv) && touched.cvv)) {
                            OpenMsgSuccess("open-msg-box");
                            setTimeout(HideMsgBox, 4000);
                        }
                    }
                }
            }
        }
    }

    const HideMsgBox = () => {
        OpenMsgSuccess("msg-box-hide");
    }

    return (
        <>
            <div className={`successful-payment ` + msgScss}>
                <div className="message-box">
                    <div className="icon-success">
                        <img src={imgSuccessIcon} alt="Successful Icon" />
                    </div>
                    Satın Alma Başarılı!
                </div>
            </div>

            <header className='header'>
                <span onClick={CloseTheBuyNow}>
                    <img src={imgBackPageBlack} alt="Back Page" />
                    Geri Dön
                </span>
            </header>

            <div className="credit-card">
                <div className="credit-card-content">
                    <div className="credit-card-number">{values.cardNumber && !errors.cardNumber ? values.cardNumber : "**** **** **** ****"}</div>
                    <div className="credit-card-info">
                        <div className="holder-name">
                            <div className="title">Kart sahibi ismi</div>
                            <div className="name">{values.fullName && !errors.fullName ? values.fullName : "Tam İsim"}</div>
                        </div>
                        <div className="expiry-date">
                            <div className="title">Son kullanma</div>
                            <div className="date">{values.expiryMonth && !errors.expiryMonth ? values.expiryMonth.length === 1 ? "0" + values.expiryMonth : values.expiryMonth : "Ay"} / {values.expiryYear && !errors.expiryYear ? values.expiryYear.slice(2) : "Yıl"}</div>
                        </div>
                    </div>
                </div>
            </div>

            <main>
                <form onSubmit={handleSubmit}>
                    <label>
                        Kart Numarası
                        {errors.cardNumber && touched.cardNumber && <div className="error-message">
                            {errors.cardNumber || touched.cardNumber}
                        </div>}
                        <input type="text" placeholder="**** **** **** ****" name="cardNumber" value={values.cardNumber.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ")
                            .trim()} onChange={handleChange} onBlur={handleBlur} maxLength="19" />
                    </label>
                    <label>
                        Kart Üzerindeki İsim
                        {errors.fullName && touched.fullName && <div className="error-message">
                            {errors.fullName || touched.fullName}
                        </div>}
                        <input type="text" placeholder="Tam İsim" name="fullName" value={values.fullName} onChange={handleChange} onBlur={handleBlur} maxLength="19" />
                    </label>
                    <div className="form-card-info">
                        <div className="expiry-date">
                            Son Kullanma Tarihi
                            <div className="expiry-date-dropdowns">
                                <select name="expiryMonth" value={values.expiryMonth} onChange={handleChange} onBlur={handleBlur}>
                                    <option value="">Ay</option>
                                    <option value="1">01</option>
                                    <option value="2">02</option>
                                    <option value="3">03</option>
                                    <option value="4">04</option>
                                    <option value="5">05</option>
                                    <option value="6">06</option>
                                    <option value="7">07</option>
                                    <option value="8">08</option>
                                    <option value="9">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                                <select name="expiryYear" value={values.expiryYear} onChange={handleChange} onBlur={handleBlur}>
                                    <option value="">Yıl</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2028</option>
                                    <option value="2029">2029</option>
                                    <option value="2030">2030</option>
                                    <option value="2031">2031</option>
                                    <option value="2032">2032</option>
                                    <option value="2033">2033</option>
                                    <option value="2034">2034</option>
                                    <option value="2035">2035</option>
                                    <option value="2036">2036</option>
                                    <option value="2037">2037</option>
                                    <option value="2038">2038</option>
                                    <option value="2039">2039</option>
                                    <option value="2040">2040</option>
                                </select>
                            </div>
                            {errors.expiryMonth && touched.expiryMonth && <div className="error-message">
                                {errors.expiryMonth || touched.expiryMonth}
                            </div>}
                            {errors.expiryYear && touched.expiryYear && <div className="error-message err-expiry-year">
                                {errors.expiryYear || touched.expiryYear}
                            </div>}
                        </div>
                        <label className="cvv">
                            CVV
                            {errors.cvv && touched.cvv && <div className="error-message">
                                {errors.cvv || touched.cvv}
                            </div>}
                            <input type="number" name="cvv" placeholder="***" value={values.cvv} onChange={handleChange} onBlur={handleBlur} onKeyDown={(e) => e.target.value.length > e.target.maxLength && (e.target.value = e.target.value.slice(0, e.target.maxLength))} onKeyPress={(e) => {if (new RegExp(/[0-9]+$/).test(e.key)) {} else e.preventDefault();}}  maxLength={2} />
                        </label>
                    </div>
                    <div className="payment">
                        <div className="total">TOPLAM: 75 TL</div>
                        <button type="submit" onClick={OpenSuccessMessage}>Şimdi Öde</button>
                    </div>
                </form>
            </main>
        </>
    );
}

export default BuyNowMovie;