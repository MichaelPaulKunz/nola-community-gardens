import Image from "next/image";
import Calendar from "./components/CalendarMonth/Calendar";

export default function Home() {
  return (
    <div className="center-body">
      <div className="img-container">
        <Image
                className="center-content"
                src="/banner.png"
                alt="Nola Community Gardens"
                height={312 * 0.9}
                width={820 * 0.9}
                priority={true}
              />
      </div>
      <Calendar />      
    </div>
  );
}
