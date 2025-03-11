const QualitySection = () => {
  return (
    <section className="relative p-10 bg-gray-100">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <img
          src="/assets/img/car-shape.png"
          alt="Quality"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 items-center gap-10">
          <div className="relative">
            <img
              src="/assets/img/about-car.jpg"
              alt="Quality"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quality Work is Our First Priority
            </h2>
            <p className="text-gray-600 mb-6">
              At Turbo Track, we are committed to delivering top-notch
              automotive services that ensure reliability, safety, and
              performance. Our experienced mechanics and cutting-edge technology
              guarantee precision in every repair, maintenance, and
              customization service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualitySection;
