import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getData } from '@/lib/data';
import BookingForm from './BookingForm';

const AnimalDetailsPage = async ({ params }) => {
      const { id } = await params;
      const data = await getData();
      const animals = Array.isArray(data) ? data : [];
      const animal = animals.find((item) => String(item.id || item._id) === String(id));

      if (!animal) {
            return (
                  <section className="container mx-auto px-4 py-10">
                        <h1 className="text-2xl font-bold">Animal not found</h1>
                        <Link href="/all-animals" className="btn mt-4">Back to All Animals</Link>
                  </section>
            );
      }

      return (
            <section className="container mx-auto px-4 py-10">
                  <div className="grid gap-8 lg:grid-cols-2">
                        <div className="card bg-base-100 shadow-xl overflow-hidden">
                              <figure>
                                    <Image
                                          src={animal.image || '/logo.png'}
                                          alt={animal.name || 'animal'}
                                          width={900}
                                          height={600}
                                          className="w-full h-full object-cover"
                                    />
                              </figure>
                              <div className="card-body">
                                    <h1 className="card-title text-3xl">{animal.name || 'Unnamed Animal'}</h1>
                                    <p><strong>Breed:</strong> {animal.breed || 'N/A'}</p>
                                    <p><strong>Type:</strong> {animal.type || 'N/A'}</p>
                                    <p><strong>Age:</strong> {animal.age ?? 'N/A'} year(s)</p>
                                    <p><strong>Weight:</strong> {animal.weight ?? 'N/A'} kg</p>
                                    <p><strong>Location:</strong> {animal.location || 'N/A'}</p>
                                    <p><strong>Price:</strong> ৳{animal.price ?? 'N/A'}</p>
                                    <p>{animal.description || 'No description provided.'}</p>
                                    <div className="card-actions justify-end mt-4">
                                          <Link href="/all-animals" className="btn btn-outline">Back</Link>
                                    </div>
                              </div>
                        </div>

                        <BookingForm animalName={animal.name} />
                  </div>
            </section>
      );
};

export default AnimalDetailsPage;
