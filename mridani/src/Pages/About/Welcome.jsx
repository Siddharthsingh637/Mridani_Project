import React from 'react';
// import Image from '../../assets/About/ab1.webp'
import Title from '../../Components/Title';

const Welcome = () => {
  return (
    <div className="bg-white text-gray-800 px-4 md:px-10 py-10">
      <div className="max-w-8xl mx-auto">
      <Title title='About Us' subtitle='Mridani'/>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-start gap-10">
          {/* Left Image */}
          <div className="flex-1">
            <img
              src="https://ik.imagekit.io/siddharth637/outer_asset/tinified/ab1.webp?updatedAt=1748981718858"
              loading="lazy"
              alt="Model in Saree"
              className=" w-full object-cover"
            />
          </div>

          {/* Right Text Content */}
          <div className="flex-1 space-y-6">
            <h3 className="text-4xl text-center font-semibold text-green-900">
              Welcome to Mridani
            </h3>

            <h3 className="text-2xl text-gray-600 font-medium leading-relaxed text-center">
              At Mridani, we bring the timeless beauty of India’s rich cultural heritage to life
              through our handcrafted collections.
            </h3>

            <p className="text-base text-gray-700 leading-relaxed">
              Our store is rooted in the celebration of folk art, blending centuries-old design
              traditions with modern elegance. We specialize in Madhubani art, an iconic folk art
              from the Mithilanchal region of Bihar, known for its intricate patterns and deep
              cultural significance. Each piece in our collection is a testament to the skilled
              craftsmanship passed down through generations of artisans.
            </p>

            <p className="text-base text-gray-700 leading-relaxed">
              Founded with a vision to honor and preserve the artistic legacy of India, Mridani
              offers an exquisite range of hand-painted fabrics, accessories, and home décor. From
              sarees and dupattas to handbags and cushion covers, every product is carefully crafted
              to reflect the vibrancy, beauty, and tradition that make Indian art so captivating.
            </p>

            <p className="text-base text-gray-700 leading-relaxed">
              At Mridani, we believe in more than just creating beautiful products; we believe in
              the stories they tell and the artisans behind them. By showcasing traditional crafts,
              we aim to contribute to the livelihood of local artisans and preserve the cultural
              values embedded in these art forms. Our collections are not just products but a homage
              to the traditions and rituals that have shaped Indian art over the centuries.
            </p>

            <p className="text-base text-gray-700 leading-relaxed">
              With Mridani, you’re not just buying a piece of art; you’re becoming a part of a
              larger story—one that celebrates the beauty, creativity, and cultural depth of India’s
              artistic heritage.
            </p>

            <p className="text-base text-gray-700 leading-relaxed">
              The sangha of “Madhubani” and “hand embroidery” brings together two time-honored
              crafts, blending vibrant visual storytelling with intricate needlework. “Madhubani,”
              celebrated for its bold, colorful depictions of mythological tales, nature, and
              folklore, uses detailed brushstrokes to create eye-catching designs. Hand embroidery,
              known for its meticulous and textured stitching, adds depth, dimension, and refinement
              to any fabric.
            </p>
          </div>
        </div>

        {/* Metrics Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <h3 className="text-2xl font-bold">20,000+ Artisans Empowered</h3>
            <p className="text-sm mt-2 text-gray-600">
              Madhubani art supports over 20,000 skilled artisans in the Mithilanchal region,
              helping preserve their ancestral craft and provide sustainable livelihoods.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">10,000+ Unique Designs</h3>
            <p className="text-sm mt-2 text-gray-600">
              Every piece at Mridani is one-of-a-kind, showcasing intricate designs passed down
              through generations.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">5,000-Year-Old Tradition</h3>
            <p className="text-sm mt-2 text-gray-600">
              Madhubani painting traces its roots back over 5,000 years, originating during the time
              of King Janak.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
