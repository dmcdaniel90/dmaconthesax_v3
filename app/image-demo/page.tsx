import ResponsiveImage from '@/components/ResponsiveImage';
import { getResponsiveImageUrls } from '@/lib/cloudinary';

export default function ImageDemoPage() {
  const imageUrls = getResponsiveImageUrls('sticker_007_wcvnkt');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Cloudinary Responsive Images Demo</h1>
        
        {/* Responsive Image Component */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Responsive Image Component</h2>
          <div className="bg-gray-800 p-6 rounded-lg">
            <ResponsiveImage
              imageName="sticker_007_wcvnkt"
              alt="DMAC on the Sax - Responsive Image Demo"
              className="w-full h-96 object-cover rounded-lg"
              fallbackSrc="/image1.webp"
            />
            <p className="text-gray-300 mt-4 text-center">
              This image automatically selects the optimal quality based on your screen size.
              Resize your browser to see it change!
            </p>
          </div>
        </div>

        {/* Generated URLs */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Generated Cloudinary URLs</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Mobile (400x300):</h4>
                <code className="text-xs bg-gray-700 p-2 rounded block break-all">
                  {imageUrls.mobile}
                </code>
              </div>
              <div>
                <h4 className="font-medium text-green-400 mb-2">Tablet (800x600):</h4>
                <code className="text-xs bg-gray-700 p-2 rounded block break-all">
                  {imageUrls.tablet}
                </code>
              </div>
              <div>
                <h4 className="font-medium text-yellow-400 mb-2">Desktop (1200x900):</h4>
                <code className="text-xs bg-gray-700 p-2 rounded block break-all">
                  {imageUrls.desktop}
                </code>
              </div>
              <div>
                <h4 className="font-medium text-purple-400 mb-2">Large (1600x1200):</h4>
                <code className="text-xs bg-gray-700 p-2 rounded block break-all">
                  {imageUrls.large}
                </code>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Features & Benefits</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✅</span>
                <span>Automatic quality selection based on screen size</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✅</span>
                <span>Real-time format optimization (WebP, JPEG, PNG)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✅</span>
                <span>Automatic compression and quality adjustment</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✅</span>
                <span>CDN-powered global delivery</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✅</span>
                <span>Lazy loading with loading states</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2">✅</span>
                <span>Fallback handling for reliability</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="bg-gray-800 p-6 rounded-lg mb-12">
          <h3 className="text-2xl font-bold mb-4">Performance Improvements</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">30-50%</div>
              <div className="text-sm text-gray-300">Faster Image Loading</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">40-70%</div>
              <div className="text-sm text-gray-300">File Size Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
              <div className="text-sm text-gray-300">Global CDN Coverage</div>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">How to Use</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Basic Implementation:</h4>
              <code className="text-sm bg-gray-700 p-3 rounded block">
                {`import ResponsiveImage from '@/components/ResponsiveImage';

<ResponsiveImage
  imageName="sticker_007_wcvnkt"
  alt="Description"
  className="w-full h-64"
/>`}
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Direct URL Usage:</h4>
              <code className="text-sm bg-gray-700 p-3 rounded block">
                {`import { getResponsiveImageUrl } from '@/lib/cloudinary';

const imageUrl = getResponsiveImageUrl('sticker_007_wcvnkt', 'desktop');
// Returns: https://res.cloudinary.com/.../w_1200,h_900,q_auto,f_auto/sticker_007_wcvnkt`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
