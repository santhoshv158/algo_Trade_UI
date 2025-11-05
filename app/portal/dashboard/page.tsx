"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import Image from 'next/image';
// import AngleOne from '@/assets/images/broker_img/AngelOne.png';
// import Dhan from '@/assets/images/broker_img/Dhan.png';
// import Groww from '@/assets/images/broker_img/Groww.png';
// import Exness from '@/assets/images/broker_img/Exness.png';

// Base API URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9000/api";

interface BrokerConnectionProps {}

const BrokerConnection: React.FC<BrokerConnectionProps> = () => {
  const router = useRouter();

  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [clientId, setClientId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<string>("");
  const [selectedBroker, setSelectedBroker] = useState<string>("angelone");
  const [apiKey, setApiKey] = useState<string>("");
  const [secretKey, setSecretKey] = useState<string>("");
  const [totp, setTotp] = useState<string>("");
  const [connectionTime, setConnectionTime] = useState<string>("");

  useEffect(() => {
    // Check if broker is already connected
    const brokerConnected = localStorage.getItem("brokerConnected") === "true";
    if (brokerConnected) {
      router.push("/portal/dashboard");
    }
  }, [router]);

  const getBrokerDisplayName = (broker: string): string => {
    switch (broker) {
      case "angelone":
        return "Angel One";
      case "dhan":
        return "Dhan";
      case "groww":
        return "Groww Kite";
      case "exness":
        return "Exness";
      default:
        return "Broker";
    }
  };

  const handleConnect = async () => {
    // Validation
    if (selectedBroker === "angelone" && (!clientId || !password || !totp)) {
      setConnectionError("Please fill in all fields");
      return;
    }

    if (selectedBroker === "dhan" && (!clientId || !apiKey)) {
      setConnectionError("Please fill in all fields");
      return;
    }

    if (selectedBroker === "groww" && (!clientId || !password || !totp)) {
      setConnectionError("Please fill in all fields");
      return;
    }

    if (selectedBroker === "exness" && (!clientId || !apiKey || !secretKey)) {
      setConnectionError("Please fill in all fields");
      return;
    }

    setConnecting(true);
    setConnectionError("");

    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const connectionTimeStr = `${hours}:${minutes}`;

    if (selectedBroker === "angelone") {
      try {
        // Angel One API integration using fetch
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

        const response = await fetch(`${API_BASE_URL}/angelone/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            clientCode: clientId,
            password: password,
            totp: totp,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const data = await response.json();

        console.log("Angel One API response:", data);
        if (data?.status === true) {
          const currentConnectionTime = `${hours}:${minutes}`;

          // Store connection details
          localStorage.setItem("brokerConnected", "true");
          localStorage.setItem("brokerName", "Angel One");
          localStorage.setItem("connectionTime", currentConnectionTime);
          localStorage.setItem("brokerId", clientId);

          // Store tokens
          if (data?.data?.jwtToken) {
            localStorage.setItem("jwtToken", data.data.jwtToken);
          }
          if (data?.data?.feedToken) {
            localStorage.setItem("feedToken", data.data.feedToken);
          }
          if (data?.data?.refreshToken) {
            localStorage.setItem("refreshToken", data.data.refreshToken);
          }

          setConnectionTime(currentConnectionTime);
          setIsConnected(true);
          setConnecting(false);

          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("brokerConnectionUpdated"));
          }

          router.push("/portal/portfolio");
        } else {
          const errorMsg =
            data?.message ||
            "Failed to connect to Angel One. Please check your credentials.";
          setConnectionError(errorMsg);
          setConnecting(false);
        }
      } catch (error: any) {
        console.error("Error connecting to Angel One:", error);

        let errorMessage = "Failed to connect. Please try again.";

        if (error.name === "AbortError") {
          errorMessage =
            "Connection timeout. Angel One server is not responding. Please try again later.";
        } else if (error.message === "Failed to fetch") {
          errorMessage =
            "Network error. Please check your internet connection and ensure the API server is running.";
        } else if (error.message) {
          errorMessage = error.message;
        }

        setConnectionError(errorMessage);
        setConnecting(false);
      }
    } else {
      // Other broker connections (mock implementation)
      setTimeout(() => {
        try {
          setIsConnected(true);
          setConnecting(false);
          localStorage.setItem("brokerConnected", "true");
          localStorage.setItem(
            "brokerName",
            getBrokerDisplayName(selectedBroker)
          );
          localStorage.setItem("connectionTime", connectionTimeStr);
          localStorage.setItem("brokerId", clientId);
          setConnectionTime(connectionTimeStr);

          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("brokerConnectionUpdated"));
          }

          // router.push("/portal/portfolio");
        } catch (error) {
          console.error("Error connecting to broker:", error);
          setConnectionError("Failed to connect. Please try again.");
          setConnecting(false);
        }
      }, 2000);
    }
  };

  return (
    <div className="background bg-bac min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h3
          className="dashboard-h3 font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Broker Connection
        </h3>
      </div>

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg">
        <div className="heding bg-ora px-6 py-4">
          <h4 className="dashboard-h4 font-semibold text-center">
            Connect to Your Broker
          </h4>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap justify-between gap-4 mb-6">
            <div
              className={`w-[22%] aspect-square flex items-center justify-center bg-gray-50 rounded-lg border-2 cursor-pointer transition-all ${
                selectedBroker === "angelone"
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-blue-300 hover:translate-y-[-3px]"
              }`}
              onClick={() => setSelectedBroker("angelone")}
            >
              {/* <Image src={AngleOne} alt="Angel One" className="p-2" /> */}
            </div>
            <div
              className={`w-[22%] aspect-square flex items-center justify-center bg-gray-50 rounded-lg border-2 cursor-pointer transition-all ${
                selectedBroker === "dhan"
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-blue-300 hover:translate-y-[-3px]"
              }`}
              onClick={() => setSelectedBroker("dhan")}
            >
              {/* <Image src={Dhan} alt="Dhan" className="p-2" /> */}
            </div>
            <div
              className={`w-[22%] aspect-square flex items-center justify-center bg-gray-50 rounded-lg border-2 cursor-pointer transition-all ${
                selectedBroker === "groww"
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-blue-300 hover:translate-y-[-3px]"
              }`}
              onClick={() => setSelectedBroker("groww")}
            >
              {/* <Image src={Groww} alt="Groww" className="p-2" /> */}
            </div>
            <div
              className={`w-[22%] aspect-square flex items-center justify-center bg-gray-50 rounded-lg border-2 cursor-pointer transition-all ${
                selectedBroker === "exness"
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-blue-300 hover:translate-y-[-3px]"
              }`}
              onClick={() => setSelectedBroker("exness")}
            >
              {/* <Image src={Exness} alt="Exness" className="p-2" /> */}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {selectedBroker === "angelone"
                ? "Client ID"
                : selectedBroker === "dhan"
                ? "Dhan ID"
                : selectedBroker === "groww"
                ? "Groww User ID"
                : "Exness Account ID"}
            </label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder={`Enter your ${
                selectedBroker === "angelone"
                  ? "Angel One Client ID"
                  : selectedBroker === "dhan"
                  ? "Dhan ID"
                  : selectedBroker === "groww"
                  ? "Groww User ID"
                  : "Exness Account ID"
              }`}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {(selectedBroker === "angelone" || selectedBroker === "groww") && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          )}

          {(selectedBroker === "angelone" || selectedBroker === "groww") && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TOTP
              </label>
              <input
                type="text"
                value={totp}
                onChange={(e) => setTotp(e.target.value)}
                placeholder="Enter your TOTP code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                maxLength={6}
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter the 6-digit code from your authenticator app
              </p>
            </div>
          )}

          {(selectedBroker === "dhan" || selectedBroker === "exness") && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key
              </label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API Key"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          )}

          {selectedBroker === "exness" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secret Key
              </label>
              <input
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                placeholder="Enter your Secret Key"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          )}

          {connectionError && (
            <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg border-l-4 border-red-500">
              {connectionError}
            </div>
          )}

          {connecting && (
            <div className="mb-4 flex items-center p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full mr-3"></div>
              <span className="text-gray-700">
                Connecting to {getBrokerDisplayName(selectedBroker)}...
              </span>
            </div>
          )}

          <button
            // className={`heding bg-ora w-full py-3 px-4 text-white font-medium rounded-lg transition-all ${
            //     connecting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
            // }`}
            onClick={handleConnect}
            // disabled={connecting}
          >
            {connecting
              ? "Connecting..."
              : `Connect to ${getBrokerDisplayName(selectedBroker)}`}
          </button>

          <button
            className="hedhover hover:bg-oraHover w-full mt-3 py-3 px-4 bg-gray-100 text-gray-800 font-medium rounded-lg transition-all"
            // onClick={() => router.push("/portal/portfolio")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrokerConnection;
