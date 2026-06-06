"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getData } from '@/lib/data';

const AllAnimalsPage = () => {
      const [animals, setAnimals] = useState([]);
      const [sortBy, setSortBy] = useState('low-to-high');

      useEffect(() => {
            const loadAnimals = async () => {
                  try {
                        const data = await getData();
                        setAnimals(Array.isArray(data) ? data : []);
                  } catch (e) {
                        setAnimals([]);
                  }
            };

            loadAnimals();
      }, []);

      const sortedAnimals = useMemo(() => {
            const copy = [...animals];
            copy.sort((a, b) => {
                  const priceA = Number(a?.price) || 0;
                  const priceB = Number(b?.price) || 0;
                  return sortBy === 'low-to-high' ? priceA - priceB : priceB - priceA;
            });
            return copy;
      }, [animals, sortBy]);

      return (
            <section className="container mx-auto px-4 py-10 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <h1 className="text-3xl font-bold">All Animals</h1>
                        <label className="form-control w-full sm:w-64">
                              <span className="label-text mb-2">Sort by price</span>
                              <select
                                    className="select select-bordered"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                              >
                                    <option value="low-to-high">Low to High</option>
                                    <option value="high-to-low">High to Low</option>
                              </select>
                        </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedAnimals.length ? sortedAnimals.map((animal) => (
                              <div key={animal.id || animal._id || animal.name} className="card bg-base-100 shadow">
                                    <figure className="h-52 overflow-hidden">
                                          <Image
                                                src={animal.image || '/logo.png'}
                                                alt={animal.name || 'animal'}
                                                width={400}
                                                height={250}
                                                className="w-full h-full "
                                          />
                                    </figure>
                                    <div className="card-body">
                                          <h2 className="card-title">{animal.name || 'Unnamed Animal'}</h2>
                                          <p>Breed: {animal.breed || 'N/A'}</p>
                                          <p>Type: {animal.type || 'N/A'}</p>
                                          <p>Location: {animal.location || 'N/A'}</p>
                                          <p className="font-semibold">Price: ৳{animal.price ?? 'N/A'}</p>
                                          <div className="card-actions justify-end">
                                                <Link href={`/all-animals/${animal.id || animal._id}`} className="btn btn-primary btn-sm bg-amber-500">
                                                      Details
                                                </Link>
                                          </div>
                                    </div>
                              </div>
                        )) : (
                              <p className="text-muted-foreground">No animals found.</p>
                        )}
                  </div>
            </section>
      );
};

export default AllAnimalsPage;