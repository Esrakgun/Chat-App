import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from './../firebase';
import EmojiPicker from 'emoji-picker-react';


//------------------------------------------------------------------ >

const Form = ({ user, room }) => {
  // State Alanı:
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const emojiPickerRef = useRef(null);
  const buttonRef = useRef(null);


//------------------------------------------------------------------>
// Emoji picker Alanının dışına tıklanınca modalı kapat:
useEffect(()=>{
  const handleClickOutSide=(e)=>{
    if(isOpen 
      && emojiPickerRef.current 
      && !emojiPickerRef.current.contains(e.target)
      && !buttonRef.current.contains(e.target))
      {setIsOpen(false);}
  };

  document.addEventListener("mousedown" , handleClickOutSide)

},[isOpen]);

//------------------------------------------------------------------ >
  // Form Gönderildiğinde:
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user);
    
      // Formu Temizlemek Adına:
      setText("");
      // Modalı Kapatmak İçin:
        setIsOpen(false);

    //------------------------------------------------------------------ //
    // Mesaj içeriği boş ise iptal edelim:
    // if (text.trim() === " ") return;
    // Veri Tabanına Mesajı Kaydet:
    //------------------------------------------------------------------ //

    //  Mesajı Kaydedileceği Kolleksiyonun Referansını Al:
    const collectionRef = collection(db, "messages")

    // Mesajı Veritabanındaki message kolleksiyonuna Ekle:
    await addDoc(collectionRef, {
      text,
      room,
      author: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      createdAt: serverTimestamp(),
    });

  
  };

  //------------------------------------------------------------------ // 
  //  Inputtaki Seçili Alana Emoji Ekle:
  const handleEmojiClick = (e) => {
    // console.log(e);
    const input = document.querySelector("input[type='text']");

       if(input){
        // İnputta Seçili Karakterlerin Başlangıç Sırası:
        // console.log(input);
        const start= input.selectionStart;
        // İnputta Seçili Karakterlerin Bitiş Sırası:
        const end=input.selectionEnd;
        // const newText =text.substring(2,7);
        // şeçili Alana Emoji ekle:
        const newText = text.substring(0,start) + e.emoji + text.substring(end);
        console.log(newText);
        // State'i Güncelle:
        setText(newText);
      }

  };





  //------------------------------------------------------------------ //
  return (
    <form onSubmit={handleSubmit} className="p-5 border border-gray-200 shadow-lg flex justify-center gap-3">

      <input
        type="text"
        className="border border-gray-200 shadow-sm p-2 px-4 rounded-md w-1/2 text-black"
        placeholder="Mesajınızı Yazınız.."
        onChange={(e) => setText(e.target.value)}
        value={text} />

      {/* //-Emoji Modalını Açıp Kapatma Kısmı:-------------------------------- // */}
      <div className="relative">
        {isOpen &&
          (<div className="absolute top-[-470px] right-[-140px]" ref={emojiPickerRef}>
           <EmojiPicker open={isOpen} onEmojiClick={handleEmojiClick} />
          </div>)
        }

        <button ref={buttonRef} type="button" className="btn text-base" onClick={() => setIsOpen(!isOpen)}>😎</button>
      </div>
      {/* //------------------------------------------------------------------ // */}
      <button
        disabled={text.length < 1}
        type="submit"
        className=" btn bg-emerald-400 text-white disabled:brightness-75">Gönder</button>

    </form>
  );
};

//-------------------------------------------------------------------------- //
export default Form;
