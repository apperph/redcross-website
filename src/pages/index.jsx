import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-cross-light-blue/50 to-white/50"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Save Lives. Join the Red Cross.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            We take pride in urging all Filipinos to take part in the heroism of the Philippine Red Cross 
            by becoming a full-fledged member, volunteer, or donor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-red-cross-red text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              JOIN US
            </Link>
            <Link
              to="/login"
              className="bg-white text-red-cross-blue px-8 py-4 rounded-lg text-lg font-semibold border-2 border-red-cross-blue hover:bg-red-cross-light-blue transition-all duration-300"
            >
              LOGIN
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Join the Red Cross?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Be part of a humanitarian movement that saves lives and builds resilient communities across the Philippines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-cross-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-red-cross-blue text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Save Lives</h3>
              <p className="text-gray-600">
                Join emergency response teams and provide critical aid during disasters and emergencies.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-cross-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-red-cross-blue text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Build Community</h3>
              <p className="text-gray-600">
                Connect with like-minded individuals and contribute to building resilient communities.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-cross-light-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-graduation-cap text-red-cross-blue text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Learn & Grow</h3>
              <p className="text-gray-600">
                Gain valuable skills in first aid, disaster preparedness, and humanitarian work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Your Data is Protected
            </h2>
            <p className="text-lg text-gray-600">
              We use industry-leading security measures to protect your personal information.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <i className="fas fa-shield-alt text-red-cross-blue text-xl mt-1"></i>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">256-bit SSL Encryption</h3>
                <p className="text-gray-600 text-sm">All personal data is encrypted and protected</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <i className="fas fa-lock text-red-cross-blue text-xl mt-1"></i>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Data Privacy Act Compliant</h3>
                <p className="text-gray-600 text-sm">Compliant with Philippine Data Privacy Act (RA 10173)</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <i className="fas fa-user-shield text-red-cross-blue text-xl mt-1"></i>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Zero Data Sharing</h3>
                <p className="text-gray-600 text-sm">No data sharing with third parties without consent</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <i className="fas fa-server text-red-cross-blue text-xl mt-1"></i>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">24/7 Monitoring</h3>
                <p className="text-gray-600 text-sm">Secure servers with continuous monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-cross-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Filipinos who are already making a positive impact in their communities.
          </p>
          <Link
            to="/register"
            className="bg-red-cross-red text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-all duration-300 inline-block"
          >
            Start Your Journey Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
