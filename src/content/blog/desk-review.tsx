import Link from "next/link";
import type { Section } from "@/components/templates/KnowledgePage";
import type { FAQ } from "@/components/shared/FAQSection";

export const deskReviewSection: Section = {
  heading: "A ten-minute review of the desk you already have",
  content: (
    <>
      <p>
        Draw a small plan showing the desk, chair, door, window and walking route. Use the checklist
        to record what you can observe before deciding whether anything needs moving.
      </p>
      <ol className="list-decimal space-y-4 pl-6">
        <li>
          <strong>Door and sightline · 2 minutes.</strong> Sit where you normally work. Can you see
          someone entering without repeatedly turning around? Mark the doorway on the sketch. In
          command-position language, visibility is considered together with support and distance
          from the route through the room.
        </li>
        <li>
          <strong>Support and access · 2 minutes.</strong> Note what is behind the chair and whether
          there is room to sit down, stand up and reach storage. Preserve a clear exit and the space
          other people need to pass.
        </li>
        <li>
          <strong>Light and glare · 2 minutes.</strong> Look at the screen and the work surface
          under the light you actually use. Record where reflections or distracting contrast appear.
          Check again at another time if daylight changes the result.
        </li>
        <li>
          <strong>Work surface and cables · 2 minutes.</strong> Put frequently used items within a
          comfortable reach and identify cables or stored objects obstructing movement. Keep the
          objects required for your work; the aim is a usable surface.
        </li>
        <li>
          <strong>One reversible change · 2 minutes.</strong> Choose a small adjustment, such as
          moving a lamp or clearing the route beside the chair. Record the observation that prompted
          it and what you will compare after using the desk.
        </li>
      </ol>
      <p>
        <strong>Example note:</strong> “The window reflects in the screen in the afternoon. I
        adjusted the blind and will compare visibility at the same time tomorrow.” This is an
        observable layout decision. It does not establish that a direction or object caused a career
        outcome.
      </p>
      <p>
        For the underlying spatial ideas, read the{" "}
        <Link href="/feng-shui/office/desk" className="font-medium underline">
          office desk command-position guide
        </Link>
        . If moving the desk would obstruct access or make work harder, keep that constraint in the
        plan and consider a smaller adjustment.
      </p>
    </>
  ),
};

export const deskReviewFaqs: FAQ[] = [
  {
    question: "Do I need to buy anything for this desk review?",
    answer:
      "No. Begin with a sketch, observations and one reversible adjustment to what you already use. A purchase should answer a specific practical need identified in the review.",
  },
  {
    question: "What if my desk cannot face the door?",
    answer:
      "Record that constraint. Compare sightlines, room access, lighting and the space behind the chair before moving furniture. A theoretical position should not obstruct the exit or make the desk difficult to use.",
  },
  {
    question: "How do I tell whether a change helped?",
    answer:
      "Compare the same observation before and after using the desk: screen reflections, access to storage, movement around the chair or distraction from passing traffic. Keep the result separate from claims about luck or income.",
  },
];
