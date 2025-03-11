import { FaBox, FaTruck, FaMoneyBillWave } from "react-icons/fa";

const FeatureSection = () => {
  const features = [
    {
      icon: <FaBox size={24} className="text-black" />, 
      title: "Trusted & Quality Work",
      description: "We prioritize quality and reliability in every service, ensuring your vehicle gets the best care possible."
    },
    {
      icon: <FaTruck size={24} className="text-black" />, 
      title: "Fast Service Delivery",
      description: "Our efficient team works quickly without compromising quality, so you can get back on the road sooner."
    },
    {
      icon: <FaMoneyBillWave size={24} className="text-black" />, 
      title: "Money-Back Guarantee",
      description: "Customer satisfaction is our priority. If you're not happy, we offer a hassle-free money-back guarantee."
    }
  ];

  return (
    <section className="relative flex items-center h-screen bg-black text-white">
      <div className="w-1/2">
        <img src="/assets/img/feature-bg.jpg" alt="Feature" className="h-full w-full object-cover" />
      </div>
      <div className="w-1/2 p-12 flex flex-col justify-center">
        <h2 className="text-4xl font-bold mb-8">Our Features</h2>
        <ul className="space-y-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-6">
              <div className="p-4 bg-yellow-400 rounded-lg shadow-lg">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FeatureSection;
