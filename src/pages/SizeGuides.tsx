
import { Ruler, Info, Heart, Watch } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoBar from '@/components/PromoBar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SizeGuides = () => {
  const ringSizes = [
    { us: "4", diameter: "14.9mm", circumference: "46.8mm" },
    { us: "4.5", diameter: "15.3mm", circumference: "48.0mm" },
    { us: "5", diameter: "15.7mm", circumference: "49.3mm" },
    { us: "5.5", diameter: "16.1mm", circumference: "50.6mm" },
    { us: "6", diameter: "16.5mm", circumference: "51.8mm" },
    { us: "6.5", diameter: "16.9mm", circumference: "53.1mm" },
    { us: "7", diameter: "17.3mm", circumference: "54.4mm" },
    { us: "7.5", diameter: "17.7mm", circumference: "55.7mm" },
    { us: "8", diameter: "18.2mm", circumference: "57.2mm" },
    { us: "8.5", diameter: "18.6mm", circumference: "58.5mm" },
    { us: "9", diameter: "19.0mm", circumference: "59.8mm" },
    { us: "9.5", diameter: "19.4mm", circumference: "61.0mm" },
    { us: "10", diameter: "19.8mm", circumference: "62.3mm" },
    { us: "10.5", diameter: "20.2mm", circumference: "63.6mm" },
    { us: "11", diameter: "20.6mm", circumference: "64.9mm" },
    { us: "11.5", diameter: "21.0mm", circumference: "66.2mm" },
    { us: "12", diameter: "21.4mm", circumference: "67.4mm" }
  ];

  const chainLengths = [
    { length: "16\"", description: "Choker - Sits at the base of the neck" },
    { length: "18\"", description: "Princess - Most popular, sits at collarbone" },
    { length: "20\"", description: "Matinee - Falls just below the collarbone" },
    { length: "22\"", description: "Opera - Falls at or just above the bust line" },
    { length: "24\"", description: "Rope - Falls at the bust line" },
    { length: "26\"", description: "Long - Falls below the bust line" },
    { length: "30\"", description: "Very Long - Falls at the waist" },
    { length: "36\"", description: "Extra Long - Can be doubled as choker" }
  ];

  const braceletSizes = [
    { size: "6.5\"", wrist: "5.5\" - 6.0\"", fit: "Snug" },
    { size: "7.0\"", wrist: "6.0\" - 6.5\"", fit: "Comfortable" },
    { size: "7.5\"", wrist: "6.5\" - 7.0\"", fit: "Comfortable" },
    { size: "8.0\"", wrist: "7.0\" - 7.5\"", fit: "Comfortable" },
    { size: "8.5\"", wrist: "7.5\" - 8.0\"", fit: "Comfortable" },
    { size: "9.0\"", wrist: "8.0\" - 8.5\"", fit: "Loose" },
    { size: "9.5\"", wrist: "8.5\" - 9.0\"", fit: "Loose" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PromoBar />
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            SIZE GUIDES
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find your perfect fit with our comprehensive sizing guides. Ensure your jewelry 
            fits comfortably and looks its best with accurate measurements.
          </p>
        </div>

        {/* Size Guide Tabs */}
        <Tabs defaultValue="rings" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-12">
            <TabsTrigger value="rings" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Rings
            </TabsTrigger>
            <TabsTrigger value="chains" className="flex items-center gap-2">
              <Ruler className="w-4 h-4" />
              Chains
            </TabsTrigger>
            <TabsTrigger value="bracelets" className="flex items-center gap-2">
              <Watch className="w-4 h-4" />
              Bracelets
            </TabsTrigger>
            <TabsTrigger value="measuring" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              How to Measure
            </TabsTrigger>
          </TabsList>

          {/* Ring Sizes */}
          <TabsContent value="rings">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Ring Size Chart</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 font-semibold">US Size</th>
                          <th className="text-left py-3 font-semibold">Diameter</th>
                          <th className="text-left py-3 font-semibold">Circumference</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ringSizes.map((size, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-2 font-medium">{size.us}</td>
                            <td className="py-2">{size.diameter}</td>
                            <td className="py-2">{size.circumference}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <Card>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">How to Measure Ring Size</h3>
                    <ol className="space-y-3 text-gray-700">
                      <li className="flex">
                        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">1</span>
                        Wrap a string around your finger where the ring will sit
                      </li>
                      <li className="flex">
                        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">2</span>
                        Mark where the string overlaps
                      </li>
                      <li className="flex">
                        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">3</span>
                        Measure the length with a ruler
                      </li>
                      <li className="flex">
                        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">4</span>
                        Compare to our circumference chart
                      </li>
                    </ol>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50">
                  <CardContent className="p-8">
                    <h4 className="font-bold text-gray-900 mb-3">Pro Tips</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Measure at the end of the day when fingers are largest</li>
                      <li>• Measure multiple times for accuracy</li>
                      <li>• Consider the width of the band (wider bands fit tighter)</li>
                      <li>• If between sizes, choose the larger size</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Chain Lengths */}
          <TabsContent value="chains">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Chain Length Guide</h3>
                  <div className="space-y-4">
                    {chainLengths.map((chain, index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                        <div>
                          <span className="font-semibold text-gray-900">{chain.length}</span>
                          <p className="text-sm text-gray-600">{chain.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Chain Style Recommendations</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">For Men</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• 20" - 24" most popular for men</li>
                        <li>• Consider neck size and build</li>
                        <li>• Thicker chains look better in longer lengths</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">For Women</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• 16" - 18" most versatile for women</li>
                        <li>• Consider neckline and personal style</li>
                        <li>• Layering multiple lengths is trendy</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Custom Lengths Available</h4>
                      <p className="text-sm text-gray-700">
                        Need a specific length? We can create custom chain lengths 
                        for most of our chains. Contact us for details.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bracelet Sizes */}
          <TabsContent value="bracelets">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Bracelet Size Chart</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 font-semibold">Bracelet Size</th>
                          <th className="text-left py-3 font-semibold">Wrist Size</th>
                          <th className="text-left py-3 font-semibold">Fit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {braceletSizes.map((size, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-2 font-medium">{size.size}</td>
                            <td className="py-2">{size.wrist}</td>
                            <td className="py-2">{size.fit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">How to Measure Wrist</h3>
                  <ol className="space-y-3 text-gray-700 mb-6">
                    <li className="flex">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">1</span>
                      Wrap a measuring tape around your wrist
                    </li>
                    <li className="flex">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">2</span>
                      Keep tape snug but not tight
                    </li>
                    <li className="flex">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">3</span>
                      Note the measurement in inches
                    </li>
                    <li className="flex">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 flex-shrink-0">4</span>
                      Add 0.5" - 1" for comfort depending on desired fit
                    </li>
                  </ol>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Fit Preferences</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• <strong>Snug:</strong> Bracelet sits close to wrist</li>
                      <li>• <strong>Comfortable:</strong> Can slide freely but won't fall off</li>
                      <li>• <strong>Loose:</strong> Moves freely and can slide over hand</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* How to Measure */}
          <TabsContent value="measuring">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Professional Measuring Tips</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Ruler className="w-5 h-5 mr-2" />
                        Best Time to Measure
                      </h4>
                      <ul className="text-gray-700 space-y-2 ml-7">
                        <li>• End of the day when fingers/wrists are largest</li>
                        <li>• Room temperature (not too hot or cold)</li>
                        <li>• When relaxed, not right after exercise</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Tools You Need</h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Flexible measuring tape (preferred)</li>
                        <li>• String or paper strip + ruler</li>
                        <li>• Pen to mark measurements</li>
                        <li>• Existing ring for comparison (rings only)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Accuracy Tips</h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Measure 3 times and take the average</li>
                        <li>• Don't pull too tight or leave too loose</li>
                        <li>• Consider finger/wrist size changes throughout day</li>
                        <li>• Account for swelling due to temperature or activity</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Size Conversion Chart</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">International Ring Sizes</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-semibold">US 7</div>
                          <div className="text-gray-600">UK N</div>
                          <div className="text-gray-600">EU 54</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">US 8</div>
                          <div className="text-gray-600">UK P</div>
                          <div className="text-gray-600">EU 57</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">US 9</div>
                          <div className="text-gray-600">UK R</div>
                          <div className="text-gray-600">EU 60</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
                      <p className="text-gray-700 text-sm mb-4">
                        Still unsure about sizing? Our team is here to help! 
                        We can provide personalized sizing advice and even send 
                        you a ring sizer for the most accurate measurement.
                      </p>
                      <div className="space-y-2 text-sm">
                        <div>📧 <strong>Email:</strong> support@imperialjewelry.com</div>
                        <div>💬 <strong>WhatsApp:</strong> +1 212 203 0584</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default SizeGuides;
