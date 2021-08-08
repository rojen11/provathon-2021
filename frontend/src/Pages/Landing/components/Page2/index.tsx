import DownloadCard from "../../../../components/DownloadCard";

export default function Page2() {
  return (
    <div className="relative" style={{ height: "100vh" }}>
      <div className="pt-10 text-5xl text-center underline">
        Download Our Dekstop Application
      </div>
      <div className="absolute top-52 w-full">
        <div className="flex justify-around">
          <DownloadCard header="Download For Windows" />
          <DownloadCard header="Download For Linux" />
          <DownloadCard header="Download For Mac" />
        </div>
      </div>
    </div>
  );
}
