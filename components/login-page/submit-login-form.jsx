import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SubmitLoginForm = ({ children, loading, className, ...props }) => {
  return (
    <Button
      {...props}
      className={cn(
        "flex w-full items-center justify-center gap-x-2 rounded-md border-none bg-transparent py-2 text-lg font-medium text-white outline outline-1 outline-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:outline-none hover:outline-1 disabled:bg-gray-200 disabled:bg-opacity-20 disabled:text-white/80 disabled:outline-none",
        className,
      )}
      type="submit"
      disabled={props.disabled || loading}
    >
      <span className="flex items-center justify-center gap-1">
        {children}
        {loading && <Loader2 size={16} className="animate-spin" />}
      </span>
    </Button>
  );
};

export default SubmitLoginForm;
