
import { Award, Shield, CheckCircle, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoBar from '@/components/PromoBar';
import { Card, CardContent } from '@/components/ui/card';

const Certificates = () => {
  const certifications = [
    {
      icon: <Award className="w-12 h-12 text-yellow-600" />,
      title: "GIA Certified Diamonds",
      description: "All our diamonds come with Gemological Institute of America certification, ensuring quality and authenticity.",
      details: [
        "Internationally recognized standards",
        "Detailed grading reports included",
        "4C assessment (Cut, Color, Clarity, Carat)",
        "Laser inscription for identification"
      ]
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Conflict-Free Guarantee",
      description: "We guarantee all our diamonds are ethically sourced and conflict-free, following Kimberley Process standards.",
      details: [
        "Kimberley Process compliant",
        "Ethical sourcing verification",
        "Supply chain transparency",
        "Supporting responsible mining"
      ]
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-green-600" />,
      title: "Quality Assurance",
      description: "Every piece undergoes rigorous quality control testing and comes with our comprehensive quality certificate.",
      details: [
        "Multi-point inspection process",
        "Material authenticity verification",
        "Craftsmanship quality assessment",
        "Durability testing standards"
      ]
    },
    {
      icon: <Star className="w-12 h-12 text-purple-600" />,
      title: "Lifetime Warranty",
      description: "We stand behind our craftsmanship with a comprehensive lifetime warranty on all our jewelry pieces.",
      details: [
        "Manufacturing defect coverage",
        "Free cleaning and inspection",
        "Repair and replacement services",
        "Lifetime customer support"
      ]
    }
  ];

  const metalCertifications = [
    {
      metal: "14K Gold",
      purity: "58.3% Pure Gold",
      stamp: "14K or 585",
      description: "Perfect balance of durability and luxury"
    },
    {
      metal: "18K Gold",
      purity: "75% Pure Gold",
      stamp: "18K or 750",
      description: "Premium gold with excellent color retention"
    },
    {
      metal: "Sterling Silver",
      purity: "92.5% Pure Silver",
      stamp: "925",
      description: "High-quality silver for lasting shine"
    },
    {
      metal: "Platinum",
      purity: "95% Pure Platinum",
      stamp: "PLAT or 950",
      description: "Ultra-premium metal for maximum durability"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            CERTIFICATES & QUALITY ASSURANCE
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trust in our commitment to quality. Every Imperial Jewelry piece comes with 
            comprehensive certifications and guarantees to ensure your complete satisfaction.
          </p>
        </div>

        {/* Main Certifications */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {cert.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {cert.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {cert.description}
                    </p>
                    <ul className="space-y-2">
                      {cert.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Metal Certifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Metal Purity Certifications
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metalCertifications.map((metal, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {metal.metal}
                  </h3>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {metal.purity}
                  </div>
                  <div className="text-sm text-gray-500 mb-3">
                    Stamp: {metal.stamp}
                  </div>
                  <p className="text-sm text-gray-600">
                    {metal.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certificate Samples */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Certificate Examples
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Diamond Certificate</h3>
              <div className="bg-white p-6 rounded border-2 border-gray-200">
                <div className="text-center mb-4">
                  <div className="text-lg font-bold">GEMOLOGICAL INSTITUTE OF AMERICA</div>
                  <div className="text-sm text-gray-600">Diamond Grading Report</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Carat Weight:</strong> 1.02 ct
                  </div>
                  <div>
                    <strong>Color Grade:</strong> D
                  </div>
                  <div>
                    <strong>Clarity Grade:</strong> VVS1
                  </div>
                  <div>
                    <strong>Cut Grade:</strong> Excellent
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-4 text-center">
                  Report Number: 2234567890
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Quality Certificate</h3>
              <div className="bg-white p-6 rounded border-2 border-gray-200">
                <div className="text-center mb-4">
                  <div className="text-lg font-bold">IMPERIAL JEWELRY</div>
                  <div className="text-sm text-gray-600">Quality Assurance Certificate</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div><strong>Item:</strong> 14K Gold Cuban Chain</div>
                  <div><strong>Metal Purity:</strong> 14K Gold (58.3%)</div>
                  <div><strong>Weight:</strong> 25.4g</div>
                  <div><strong>Quality Grade:</strong> Premium</div>
                  <div><strong>Warranty:</strong> Lifetime</div>
                </div>
                <div className="text-xs text-gray-500 mt-4 text-center">
                  Certificate ID: IJ-2024-001234
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Authentication Process */}
        <div className="bg-blue-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Our Authentication Process
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Material Verification</h3>
              <p className="text-gray-600 text-sm">
                Every material is tested and verified for purity and authenticity using advanced equipment
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Quality Inspection</h3>
              <p className="text-gray-600 text-sm">
                Each piece undergoes comprehensive quality control testing by our expert craftsmen
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Certification Issuance</h3>
              <p className="text-gray-600 text-sm">
                Official certificates are issued and included with every purchase for your records
              </p>
            </div>
          </div>
        </div>

        {/* Warranty Information */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Your Peace of Mind Guarantee
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Every purchase from Imperial Jewelry comes with our comprehensive warranty and 
            satisfaction guarantee. We stand behind the quality of our work and materials.
          </p>
          <div className="bg-gray-900 text-white p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">What's Covered</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <ul className="space-y-2">
                <li>• Manufacturing defects</li>
                <li>• Stone loosening or loss</li>
                <li>• Metal tarnishing or discoloration</li>
                <li>• Clasp or closure failures</li>
              </ul>
              <ul className="space-y-2">
                <li>• Free annual cleaning and inspection</li>
                <li>• Priority repair services</li>
                <li>• Replacement parts and components</li>
                <li>• 30-day money-back guarantee</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Certificates;
