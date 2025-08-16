import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface RawDataProps {
  title: string;
  data: any;
}

export default function RawData({ title, data }: RawDataProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={title}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <pre className="overflow-x-auto text-sm bg-muted p-2 rounded">{JSON.stringify(data, null, 2)}</pre>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}