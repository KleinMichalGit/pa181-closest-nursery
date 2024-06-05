import Link from "next/link";
import Image from "next/image";

const Navigation = () => {
  return (
    <nav className="pl-12 pr-12">
      <ul className="flex">
        <li className="flex-none w-14">
          <Link href={"/"}>
            <Image src="/favicon.ico" alt="logo" width={50} height={50} />
          </Link>
        </li>
        <li className="flex-initial w-64">
          <Link href={"/about"}>About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
