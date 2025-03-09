import Image from "next/image";
import Events from "./components/Events/Events"

export default function Home() {
  return (
    <div className="center-body">
      <div className="img-container">
        <Image
                className="center-content"
                src="/banner-main.png"
                alt="Nola Community Gardens"
                height={312 * 0.74}
                width={820 * 0.74}
                priority={true}
        />
      </div>
      <Events />
      <div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      </div>      
    </div>
  );
}
