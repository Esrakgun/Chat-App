import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import Message from "./message";
import Arrow from "./arrow";

// ----------------------------------------------------------------------------------------->
const List = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [unreadCount, setUnReadCount] = useState(0);
  const lastMessageRef = useRef(null);
  const containerRef = useRef(null);
  const prevMessageLength = useRef(0);
  const audioRef =useRef(new Audio("/notify.mp3"));

  // ----------------------------------------------------------------------------------------->

  // Veritabanında mesajları al:
  useEffect(() => {
    // Kolleksiyonun Referansını Al:
    const collectionRef = collection(db, "messages");

    // Sorgu Ayarları Yap:
    const q = query(
      collectionRef,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    // Meseajelar kollecsıynun abone ol(değişiklik takip edicez.)
    // Kolleksiyondaki her değişiklikte fonksıyon tetiklenicek ve bize dökümanları getircek:
    const unsub = onSnapshot(q, (snapshot) => {
      // Dökümanların Geçici olarak Tutullduğu dizi:
      const temp = [];
      // Dökümanları dönüp içerisindeki datalara erişip diziye aktar:
      snapshot.docs.forEach((doc) => {
        temp.push(doc.data());
      });
      // Dökümanları State'e aktar:
      setMessages(temp);
    });

    // ComponentWillUnMount: component ekrandan ayrılınca çalışır:
    //  unsub ile veritabınına yapılan aboneliği iptal eder..Performans Güncellemesidir:
    return () => unsub();
    // console.log("Component Ekrandan Ayrılınca..");
  }, []);
  // console.log(messages);

  // ----------------------------------------------------------------------------------------->
  // Her yeni mesaj geldiğinde ekranı aşağı kaydır:
  useEffect(() => {
    // console.log("Yeni Mesaj");
    if (messages.length > 1) {
      const lastMsg = messages[messages.length - 1];
      // ---------------------------------------------------------------------------------------->
      // Kullanıcı Yukarıdayken mesaj gelirse unread sayısını arttır:
      if (messages.length > prevMessageLength.current && !isAtBottom) {
        // Eğer son mesaj gönderen kullanıcı kendisi değilse:
        if (lastMsg.author.id !== auth.currentUser.uid) {
          setUnReadCount((prev) => prev + 1);
          // Yukarıdayken yenı msj gelınce bıldırım sesı gelsın:               
          playSound();
        }
      }

      prevMessageLength.current = messages.length;
      // ----------------------------------------------------------------------------------------->
      if (lastMsg.author.id === auth.currentUser.uid) {
        // Eğer son mesajı aktif kullanıcı attıysa her koşulda kaydır:
        scrollToBottom();
      } else if (isAtBottom) {
        // Eğer son mesajı farklı kullanıcı attıysa kullanıcı aşağıdaysa kaydır:
        scrollToBottom();
     
        // Eğer aşağıdayken başkasından msj gelirse bilidirim:
       playSound();
        

      }
    }
   
  }, [messages]);
  // ----------------------------------------------------------------------------------------->
  // Kullanıcının Aşağıda olup olmadığını tespit eden fonksiyon:
  const handleScroll = () => {
    // ScrollTop kullanıcı yukarıdan ıtıbaren ne kadar kaydırdı,
    // ClientHeight kullanıcının ekranda göründüğü kısmın yüksekliği
    // ScrollHeight tüm içeriğin yüksekliği Gizli Kısımlar,
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;

    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 100);
  };
  // ----------------------------------------------------------------------------------------->
  // En Aşağı Kaydıran Fonksiyon:
  const scrollToBottom = () => {
    // Son mesaja kaydır:
    lastMessageRef.current.scrollIntoView();
    // Okunmayan mesaj sayısını sıfırla:
    setUnReadCount(0);
  };

// Bildirim Sesini Oynat:
  const playSound=()=>{
    audioRef.current.currentTime=0;
    audioRef.current.play();
  };
// Kendı msjlarımda da duyulsun:
  // playSound();
  // ----------------------------------------------------------------------------------------->
  return (
    <main
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 p-3 flex flex-col gap-3 w-full overflow-y-auto relative"
    >
      {messages.length < 1 ? (
        <div className="h-full grid place-items-center text-zinc-400">
          <p> Sohbete İlk Mesajı Gönderin..</p>{" "}
        </div>
      ) : (
        messages.map((i, key) => <Message item={i} key={key} />)
      )}

      <div ref={lastMessageRef} />

      <Arrow
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
        unreadCount={unreadCount}
      />
    </main>
  );
};

export default List;
