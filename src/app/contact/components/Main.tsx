import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import HeaderLogo from "@/app/rootcomponents/header/Logo";

export default function Main() {
  return (
    <main className="min-h-[100vh]">
      <section className="py-32">
        <div className="mx-auto max-w-4xl px-4 lg:px-0">
            
          <h1 className="mb-12 text-center text-4xl font-semibold lg:text-5xl">
            Reach out to us.
          </h1>

          <div className="grid divide-y border md:grid-cols-2 md:gap-4 md:divide-x md:divide-y-0">
            <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
              <div>
                <h2 className="mb-3 text-lg font-semibold">Collaborate</h2>
                <Link
                  href="mailto:info@onpoint.vercel.app"
                  className="text-lg text-green-600 hover:underline dark:text-green-400"
                >
                  info@onpoint.vercel.app
                </Link>
                <p className="mt-3 text-sm">+254 111222333</p>
              </div>
            </div>
            <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
              <div>
                <h3 className="mb-3 text-lg font-semibold">Book</h3>
                <Link
                  href="mailto:press@tailus.io"
                  className="text-lg text-green-600 hover:underline dark:text-green-400"
                >
                  bookings@onpoint.vercel.app
                </Link>
                <p className="mt-3 text-sm">+254 111222333</p>
              </div>
            </div>
          </div>

          <div className="h-3 border-x bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_6px)]"></div>
          <form action="" className="border px-4 py-12 lg:px-0 lg:py-24">
            <Card className="mx-auto max-w-lg p-8 sm:p-16">
            <HeaderLogo />
              <h3 className="text-2xl text-green-800 dark:text-green-200 font-semibold">
              Reach out to our support team
              </h3>
              <p className="mt-2 text-sm md:text-md lg:text-lg text-green-600 dark:text-green-300">
                We’re eager to help so we'll get back to you ASAP!
              </p>

              <div className="**:[&>label]:block mt-12 space-y-6 *:space-y-3">
                <div>
                  <Label htmlFor="name" className="space-y-2">
                    Full name
                  </Label>
                  <Input type="text" id="name" required />
                </div>
                <div>
                  <Label htmlFor="email" className="space-y-2">
                    Email
                  </Label>
                  <Input type="email" id="email" required />
                </div>
                <div>
                  <Label htmlFor="country" className="space-y-2">
                    Country/Region
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Kenya</SelectItem>
                      <SelectItem value="2">United States</SelectItem>
                      <SelectItem value="3">France</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="space-y-2">
                    Phone number
                  </Label>
                  <Input type="phone" id="phoneNumber" />
                </div>
                
                <div>
                  <Label htmlFor="msg" className="space-y-2">
                    Message
                  </Label>
                  <Textarea id="msg" rows={3} />
                </div>
                <Button className="cursor-pointer bg-lightmode-btn-bg-color hover:bg-lightmode-btn-bg-hover-color dark:bg-darkmode-btn-bg-color dark:hover:bg-darkmode-btn-bg-hover-color"><span className="text-lightmode-btn-text-color dark:text-darkmode-btn-text-color">Submit</span></Button>
              </div>
            </Card>
          </form>
        </div>
      </section>
    </main>
  );
}
