import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react"; // LogOut ikonkasini qo'shamiz
import { useSelector, useDispatch } from "react-redux"; // Redux hooklarini import qilamiz
import { selectCurrentUser, logout } from "@/store/slices/authSlice"; // authSlice dan kerakli narsalarni import qilamiz
import type { RootState } from "@/store"; // RootState ni import qilamiz

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) =>
    selectCurrentUser(state)
  ); // Foydalanuvchini store dan olamiz

  const navLinks = [
    { title: "Asosiy", href: "/" },
    { title: "To'yxonalar", href: "/venues" },
    { title: "Biz haqimizda", href: "/about" },
    { title: "Bog'lanish", href: "/contact" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto px-4">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">To'yBooking</span>
        </Link>
        <nav className="hidden flex-1 items-center space-x-4 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.title}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {currentUser ? (
            <>
              <span className="text-sm font-medium">
                {currentUser.firstName || currentUser.username}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Chiqish"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Kirish</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Ro'yxatdan o'tish</Link>
              </Button>
            </>
          )}
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menyuni ochish</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 text-lg font-medium mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    to={link.href}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                ))}
                {currentUser ? (
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="justify-start px-2.5"
                  >
                    <LogOut className="mr-4 h-5 w-5" /> Chiqish
                  </Button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      Kirish
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      Ro'yxatdan o'tish
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
