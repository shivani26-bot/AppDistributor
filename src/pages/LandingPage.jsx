import { Button } from "@/components/ui/button";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-[url('/landingpage.png')] bg-cover bg-center h-screen ">
        <div className="py-4 flex justify-between items-center px-4">
          <div>
            <div className="flex  items-center mb-2">
              <img className="w-10 mr-2" src="/microsoft.png" alt="Microsoft" />
              <p className="mr-2  text-white text-3xl ">Microsoft</p>
            </div>
            <p className="text-white text-3xl ">
              Visual Studio{" "}
              <span className="text-3xl font-bold"> App Center</span>
            </p>
          </div>
          <Button
            onClick={() => navigate("/authSignup")}
            className="text-white text-lg px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
          >
            🚀 Get started
          </Button>
        </div>
      </div>
      <div className="mx-10 my-5 bg-gray-100 p-6 rounded-lg shadow-lg">
        <p className="text-3xl text-center mb-8">App center is Awesome for:</p>
        <div className="flex justify-between items-center my-4">
          <div className="flex flex-col items-center">
            <img className="w-16 h-16 object-contain" src="/logo-android.svg" />
            <p className="text-center">Android apps </p>
            <p className="text-center text-gray-400">Java and Kotlin</p>
          </div>
          <div className="flex flex-col items-center">
            <img className="w-16 h-16 object-contain" src="/logo-ios.svg" />
            <p className="text-center">iOS apps</p>

            <p className="text-center text-gray-400">Swift and Objective-C</p>
          </div>
          <div>
            <img
              className="w-16 h-16 object-contain"
              src="/logo-react-native.svg"
            />
            <p className="text-center">React Native apps</p>

            <p className="text-center text-gray-400">iOS and Android</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="w-16 h-16 object-contain "
              src="/logo-windows.svg"
            />
            <p className="text-center">Windows apps</p>

            <p className="text-center text-gray-400">UWP, WPF and WinForms</p>
          </div>
          <div className="flex flex-col items-center">
            <img className="w-16 h-16 object-contain" src="/logo-xamarin.svg" />
            <p className="text-center">Xamarin apps</p>

            <p className="text-center text-gray-400">iOS and Android</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="w-16 h-16 object-contain"
              src="/party-popper-emoji.png"
            />
            <p className="text-center">Even more!</p>

            <p className="text-center text-gray-400">macOS, tvOS and Unity</p>
          </div>
        </div>
      </div>

      <div className="bg-[url('/pricing-bg.svg')] bg-cover bg-center  text-white py-8">
        <div className="mx-4 my-8">
          <p className="text-center text-3xl font-bold  tracking-wider ">
            You’ll&nbsp;&nbsp;go&nbsp;&nbsp;a&nbsp;&nbsp;long&nbsp;&nbsp;way,&nbsp;&nbsp;for&nbsp;&nbsp;free.
          </p>
          <ul className="grid grid-cols-3 gap-4 mx-4 my-8">
            <li>
              <p>
                {" "}
                ✔&nbsp;&nbsp;<strong>Build:&nbsp;</strong> 240 build minutes per
                month
              </p>
            </li>
            <li>
              <p>
                {" "}
                ✔&nbsp;&nbsp;<strong>Test:&nbsp;</strong> Free 30 day trial
              </p>
            </li>
            <li>
              <p>
                {" "}
                ✔&nbsp;&nbsp;<strong>Distribute:&nbsp;</strong> Unlimited
                distributions and users month
              </p>
            </li>
            <li>
              <p>
                {" "}
                ✔&nbsp;&nbsp;<strong>Analytics:&nbsp;</strong> All features
                included month
              </p>
            </li>
            <li>
              <p>
                {" "}
                ✔&nbsp;&nbsp;<strong>Crash Reporting:&nbsp;</strong> All
                features included per month
              </p>
            </li>
            <li>
              <p>
                {" "}
                ✔&nbsp;&nbsp;<strong>General:&nbsp;</strong>Unlimited apps,
                organizations, and teams month
              </p>
            </li>
          </ul>
          <p className="text-center text-3xl font-bold  tracking-wider ">
            {" "}
            Pay&nbsp;&nbsp;as&nbsp;&nbsp;your&nbsp;&nbsp;App&nbsp;&nbsp;grows
          </p>
          <div className="flex justify-center gap-10 items-center my-8">
            <Card className="w-[350px] h-[250] ">
              <CardHeader>
                <CardTitle> Add concurrent builds as your team grows</CardTitle>
                <CardDescription>
                  Ship your app faster with multiple builds running in parallel.
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter className="flex  flex-col items-start">
                <span className="text-green-500 text-3xl ">+$40/month</span>
                <p>per build concurrency</p>
              </CardFooter>
            </Card>
            <Card className="w-[350px] h-[250] ">
              <CardHeader>
                <CardTitle> Test on more devices in parallel</CardTitle>
                <CardDescription>
                  Run UI test on thousands of real devices and hundreds of
                  configurations.
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardContent></CardContent>
              <CardFooter className="flex flex-col items-start">
                <span className="text-green-500 text-3xl "> +$99/month</span>
                <p>per standard device concurrency</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <div className="p-10 text-center bg-gray-800  text-white">
        Made with ❤️ by THBS
      </div>
    </>
  );
};

export default LandingPage;
