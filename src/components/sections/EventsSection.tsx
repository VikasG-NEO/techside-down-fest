import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code, Gamepad2, Brain, Palette, Mic, Trophy } from 'lucide-react';
import NeonButton from '../NeonButton';
import EventRegistrationModal from '../EventRegistrationModal';

const events = [
  {
    id: 1,
    icon: Code,
    title: "TECHXPRESSION × CSI HACKATHON",
    category: "Hackathon",
    description: "25 Hours | Jan 30–31 | IT Block (1st Floor). AI, Web, Data & Automation-based problem solving.",
    duration: "25 Hours",
    difficulty: "Nightmare",
    fee: 500
  },
  {
    id: 2,
    icon: Brain,
    title: "THE NINA PROJECT",
    category: "AI Exhibition",
    description: "Jan 30–31 | Main Lawn / IoT Lab. Showcase of AI, ML, automation, and research models.",
    duration: "2 Days",
    difficulty: "Expert",
    fee: 200
  },
  {
    id: 3,
    icon: Gamepad2,
    title: "ESCAPE FROM UPSIDE",
    category: "Escape Room",
    description: "Jan 30–31 | Rooms 208/209. Stranger Things–style puzzle and logic escape challenge (Teams of 3).",
    duration: "Timed",
    difficulty: "Hard",
    fee: 150
  },
  {
    id: 4,
    icon: Trophy,
    title: "PALACE ARCADE",
    category: "E-Sports",
    description: "Jan 30 | NR 309/310. Mobile gaming tournament (TPP Squad, Teams of 4).",
    duration: "1 Day",
    difficulty: "Hard",
    fee: 200
  },
  {
    id: 5,
    icon: Code,
    title: "PROJECT HAWKINS",
    category: "Upside-Down Coding",
    description: "Jan 31. Solo coding contest with inverted logic and twisted constraints.",
    duration: "1 Day",
    difficulty: "Nightmare",
    fee: 100
  },
  {
    id: 6,
    icon: Brain,
    title: "CLOSE THE GATES",
    category: "Capture The Flag",
    description: "Jan 31. Solo cybersecurity challenge (Easy to Hard rounds).",
    duration: "1 Day",
    difficulty: "Expert",
    fee: 100
  },
  {
    id: 7,
    icon: Mic,
    title: "CARNIVAL 011",
    category: "Techstar Unplugged",
    description: "Jan 31 | Main Lawn / Seminar Hall. Cultural events including singing, dance, open mic, and performances.",
    duration: "1 Day",
    difficulty: "Medium",
    fee: 100
  }
];

const difficultyColors: Record<string, string> = {
  "Medium": "text-green-400",
  "Hard": "text-yellow-400",
  "Expert": "text-orange-400",
  "Nightmare": "text-primary",
  "Legendary": "text-purple-400"
};

const EventsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  return (
    <section ref={ref} id="events" className="relative py-32 px-4 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1)_0%,transparent_70%)]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-stranger tracking-[0.5em] text-sm">CHALLENGES AWAIT</span>
          <h2 className="text-5xl md:text-7xl font-display mt-4 neon-text-subtle text-primary">
            EVENTS
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Each event is a portal to prove your worth. Choose your battle wisely.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
              className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-500"
            >
              {/* Glow Background */}
              <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent transition-opacity duration-500 ${hoveredEvent === event.id ? 'opacity-100' : 'opacity-0'}`} />

              {/* Content */}
              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <event.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className={`text-xs font-stranger tracking-wider ${difficultyColors[event.difficulty]}`}>
                    {event.difficulty}
                  </span>
                </div>

                {/* Category */}
                <span className="text-xs text-muted-foreground font-stranger tracking-wider">
                  {event.category}
                </span>

                {/* Title */}
                <h3 className="text-2xl font-display mt-2 mb-3 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4">
                  {event.description}
                </p>

                {/* Duration */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground">Duration</span>
                    <div className="text-xl font-display text-primary neon-text-subtle">
                      {event.duration}
                    </div>
                  </div>
                  <NeonButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedEvent(event)}
                  >
                    Enter
                  </NeonButton>
                </div>
              </div>

              {/* Animated Border */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: hoveredEvent === event.id ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <NeonButton variant="outline" size="lg">
            View All Events
          </NeonButton>
        </motion.div>
      </div>
      {/* Registration Modal */}
      <EventRegistrationModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        eventName={selectedEvent?.title || ''}
        eventId={selectedEvent?.id || 0}
        eventFee={selectedEvent?.fee || 0}
      />
    </section>
  );
};

export default EventsSection;