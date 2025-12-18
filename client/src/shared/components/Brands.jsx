import BrandsLoop from "./BrandsLoop";

const techLogos = [
  { node: "gucci", title: "gucci" },
  { node: "dolce", title: "dolce" },
  { node: "versace", title: "versace"},
  { node: "prada", title: "prada" },
];


function Brands() {
  return (
    <div className="h-[200px] bg-black  ">
      <BrandsLoop className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white "
        logos={techLogos}
        speed={100}
        direction="left"
        logoHeight={48}
        gap={40}
        pauseOnHover
        fadeOutColor="#000000"
        ariaLabel="Technology partners"
      />
    </div>
  );
}

export default Brands;
