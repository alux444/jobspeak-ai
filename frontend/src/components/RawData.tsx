import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface RawDataProps {
  title: string;
  data: any;
}

export default function RawData({ title, data }: RawDataProps) {
  return (
    <Accordion type="single" collapsible className="w-full min-w-0">
      <AccordionItem value={title} className="min-w-0">
        <AccordionTrigger className="min-w-0">{title}</AccordionTrigger>
        <AccordionContent className="min-w-0">
          <div className="w-full max-w-full overflow-x-auto rounded bg-muted">
            <pre className="min-w-full whitespace-pre text-sm p-2">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}