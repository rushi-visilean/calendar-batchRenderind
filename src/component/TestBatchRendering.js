import React, { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function TestBatchRendering() {
  const [percentageImprovement, setPercentageImprovement] = useState(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();

    if (calendarApi) {
      const iterations = 1000;

      // Measure time taken without batchRendering
      const startTimeWithoutBatch = performance.now();

      for (let i = 0; i < iterations; i++) {
        calendarApi.changeView("dayGridMonth");
        calendarApi.addEvent({ title: "New Event", start: "2023-12-10" });        
      }

      const endTimeWithoutBatch = performance.now();
      const timeTakenWithoutBatch = endTimeWithoutBatch - startTimeWithoutBatch;

      console.log("Time taken without batchRendering:", timeTakenWithoutBatch);

      // Measure time taken with batchRendering
      const startTimeWithBatch = performance.now();

      calendarApi.batchRendering(() => {
       
       //api calling
        for (let i = 0; i < iterations; i++) {
          calendarApi.changeView("dayGridMonth");
          calendarApi.addEvent({ title: "New Event", start: "2023-12-10" });
        }
      });

      const endTimeWithBatch = performance.now();
      const timeTakenWithBatch = endTimeWithBatch - startTimeWithBatch;

      console.log("Time taken with batchRendering:", timeTakenWithBatch);
        
      const improvement =
        ((timeTakenWithoutBatch - timeTakenWithBatch) / timeTakenWithoutBatch) *
        100;
      setPercentageImprovement(improvement);
    }
  }, []);

  const calendarEvents = [
    {
      title: "Event 1",
      start: "2023-11-25",
      end: "2023-11-27",
    },
    {
      title: "Event 2",
      start: "2023-12-01",
      end: "2023-12-03",
    },
  ];

  const renderEventContent = ({ event }) => {
    return (
      <div>
        <p>{event.title}</p>
        <p>
          {event.startStr} - {event.endStr}
        </p>
      </div>
    );
  };
  if (percentageImprovement)
    console.log(
      `Rendering efficiency improved by ${percentageImprovement.toFixed(2)}% with batchRendering`
    );
  return (
    <div>
      <h1>Test Batch Rendering</h1>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={calendarEvents}
        eventContent={renderEventContent}
      />
      {percentageImprovement && (
        <p>
          Rendering efficiency improved by {percentageImprovement}% with
          batchRendering
        </p>
      )}
    </div>
  );
}

export default TestBatchRendering;
