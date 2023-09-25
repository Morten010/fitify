import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import { FaTiktok } from "react-icons/fa"
import img1 from "@/src/assets/tikHow/tk1.jpg"
import img2 from "@/src/assets/tikHow/tk2.jpg"
import img3 from "@/src/assets/tikHow/tk3.jpg"
import Image from "next/image"

export function TiktokHow() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
        variant="outline"
        size="icon"
        >
            <FaTiktok />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[70vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>
            Why is my TikTok embed link not working?
          </DialogTitle>
          <DialogDescription>
            If you copy your video link from within the TikTok app it will give you a shortened version of the URL that won't work to embed your video. To get the correct link follow the steps below:
            <ol
            className="list-outside list-decimal gap-4 flex flex-col"
            >
                <li
                className="flex flex-col gap-2 mt-2"
                >
                    1. Copy the link from the TikTok app
                    <Image
                    src={img1} 
                    alt="Copy the link from the TikTok app" 
                    />
                </li>
                <li
                className="flex flex-col gap-2"
                >
                    2. Paste & go to the link in your web browser
                    <Image
                    src={img2} 
                    alt="Paste & go to the link in your web browser" 
                    />
                </li>
                <li
                className="flex flex-col gap-2"
                >
                    3. When it loads, copy and use the new link from your search bar
                    <Image
                    src={img3} 
                    alt="When it loads, copy and use the new link from your search bar" 
                    />
                </li>
            </ol>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
