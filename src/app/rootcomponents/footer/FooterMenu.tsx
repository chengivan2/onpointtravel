import Link from "next/link";

export default function FooterMenu() {
  const links = [
    {
      group: "Top Destinations",
      items: [
        {
          title: "Diani",
          href: "/destinations/diani",
        },
        {
          title: "Nairobi",
          href: "/destinations/nairobi-national-park",
        },
        {
          title: "Dubai",
          href: "/destinations/dubai",
        },
        {
          title: "Masai Mara",
          href: "/destinations/masai-mara-national-reserve",
        },
        {
          title: "Nakuru",
          href: "/destinations/lake-nakuru-national-park",
        },
      ],
    },
    {
      group: "Company",
      items: [
        {
          title: "About",
          href: "about",
        },
        {
          title: "Careers",
          href: "#",
        },
        {
          title: "Blog",
          href: "#",
        },
        {
          title: "Contact",
          href: "contact",
        },
        {
          title: "Help",
          href: "#",
        },
      ],
    },
    {
      group: "Legal",
      items: [
        {
          title: "TRA Licence",
          href: "#",
        },
        {
          title: "Privacy Policy",
          href: "privacy-policy",
        },
        {
          title: "Terms & Conditions",
          href: "terms-and-conditions",
        },
      ],
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-3">
      {links.map((link, index) => (
        <div key={index} className="space-y-4 text-sm">
          <span className="block font-bold">
            <h2 className="text-[#F5F5F5]">{link.group}</h2>
          </span>
          {link.items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="font-light block duration-150 text-white/80 hover:text-green-300"
            >
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
