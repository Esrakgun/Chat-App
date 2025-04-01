import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
// import { Outlet,  useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Loader from './loader';

// Protected Componenti içerisine alınan routelara sadece oturumu açık olan kullanıcılar erişebilecek:
const Protected = () => {
    // const navigate = useNavigate();
    // Aktif Kullanıcı (Oturum Açık) State'i:
    const [user, setUser] = useState(undefined);
    // Kapsayıcı (parent) route i.erisinde Alt (Child) route'un elemenetini ekrana bas:<Outlate/> Componenti ile:
    // console.log("prootected Çalıştı..");


    //  Aktif Kullanıcı verisini al:
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user ? user : null);
        });
    }, []);

    // Kullanıcı Verisi Yükleniyorsa Loader Bas:
    if (user === undefined) return <Loader />;

    // Kullanıcı Oturumu Kapalıysa Logine Yönlendir:
    // if (user === null) return navigate("/");
    if (user === null) return <Navigate to="/" replace/>;
    // Kullanıcı Hesabı Açıksa ilgili Sayfayı Göster:
    // Kapsayıcı (parent) route içerisinde Alt Child Route 'un elemenetini Ekrana Bas:
    // console.log("Mevcut Kullanıcı..", user);
    return <Outlet context={user}/>;

};

export default Protected;
