"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Archive } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { archiveInquiry } from "@/app/admin/actions";

interface ArchiveInquiryButtonProps {
  id: string;
}

export function ArchiveInquiryButton({ id }: ArchiveInquiryButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleArchive = () => {
    startTransition(async () => {
      // Voláme serverovou akci
      const result = await archiveInquiry(id);

      if (result.success) {
        toast.success(result.message);
        // Po úspěšné archivaci přesměrujeme zpět na seznam poptávek
        router.push("/admin/inquiries");
        router.refresh();
      } else {
        toast.error("Chyba při archivaci: " + result.error);
      }
    });
  };

  return (
    <Button
      variant="outline"
      className="w-full justify-start text-orange-600 hover:text-orange-700 hover:bg-orange-50"
      onClick={handleArchive}
      disabled={isPending}
    >
      <Archive className="h-4 w-4 mr-2" />
      {isPending ? "Archivuji..." : "Archivovat poptávku"}
    </Button>
  );
}
