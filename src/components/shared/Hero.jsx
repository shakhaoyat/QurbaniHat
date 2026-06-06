import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getData } from '@/lib/data';
import Marquee from "react-fast-marquee";

const tips = [
      'Check animal health certificates before buying.',
      'Choose animals with clear teeth and bright eyes.',
      'Prefer animals with healthy coats and mobility.',
];

const topBreeds = ['Sahiwal', 'Brahman', 'Boer Goat', 'Nellore', 'Red Sindhi'];

const Hero = async () => {
      let animals = [];
      try {
            const data = await getData();
            animals = Array.isArray(data) ? data.slice(0, 4) : [];
      } catch (e) {
            animals = [];
      }

      return (
            <section className="space-y-12">
                  <div className="hero bg-base-200 py-16">
                        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8">
                              <div className="flex-1">
                                    <h1 className="text-4xl font-bold">Find the best Qurbani animals near you</h1>
                                    <p className="py-4 text-lg text-muted-foreground">Browse trusted sellers, compare prices, and get tips to choose the right animal for Qurbani.</p>
                                    <Link href="/all-animals" className="btn btn-primary">Browse Animals</Link>
                              </div>
                              <div className="flex-1">
                                    <div className="rounded-lg overflow-hidden shadow-lg">
                                          <Image src={'/logo.png'} alt="banner" width={700} height={420} className="object-cover" />
                                    </div>
                              </div>
                        </div>
                  </div>

                  <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold mb-4 items-center text-center">Featured Animals</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              {animals.length ? animals.map((animal) => (
                                    <div key={animal._id || animal.id || animal.name} className="card bg-base-100 shadow">
                                          <figure className="h-40 w-full overflow-hidden">
                                                <Image src={animal.image || '/logo.png'} alt={animal.name || 'animal'} width={400} height={240} className="w-full h-full " />
                                          </figure>
                                          <div className="card-body">
                                                <h3 className="card-title">{animal.name || 'Unnamed'}</h3>
                                                <p className="text-sm text-muted-foreground">Price: {animal.price || 'N/A'}</p>
                                                <div className="card-actions justify-end">
                                                      <Link href={`/all-animals/${animal._id || animal.id}`}
                                                            className="btn btn-sm">View</Link>
                                                </div>
                                          </div>
                                    </div>
                              )) : (
                                    <p className="text-muted-foreground">No featured animals available.</p>
                              )}
                        </div>
                  </div>

                  <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="card bg-base-100 shadow p-6">
                              <h3 className="text-xl font-semibold mb-3">Qurbani Tips</h3>
                              <ul className="list-disc list-inside space-y-2 text-muted-foreground">

                                    <Marquee pauseOnHover={true} gradient={false} speed={50}>
                                          {tips.map((tip, i) => <li key={i}>{tip}</li>)}
                                    </Marquee>
                              </ul>
                        </div>
                        <div className="card bg-base-100 shadow p-6">
                              <h3 className="text-xl font-semibold mb-3">Top Breeds</h3>
                              <div className="flex flex-wrap gap-2">
                                    {topBreeds.map((breed, indx) => (
                                          <span key={indx} className="badge badge-outline">{breed}</span>
                                    ))}
                              </div>
                        </div>
                  </div>
            </section>
      );
};

export default Hero;