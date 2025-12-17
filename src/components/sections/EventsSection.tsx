import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Code, Gamepad2, Brain, Palette, Mic, Trophy } from 'lucide-react';
import NeonButton from '../NeonButton';
import EventRegistrationModal from '../EventRegistrationModal';

const events = [
  {
    id: 1,
    icon: Code,
    title: "CODE DEMOGORGON",
    category: "Hackathon",
    description: "48-hour survival coding challenge. Build or be consumed by the code.",
    prize: "₹1,00,000",
    difficulty: "Nightmare"
  },
  {
    id: 2,
    icon: Gamepad2,
    title: "ARCADE ABYSS",
    category: "Gaming",
    description: "Retro gaming tournament meets modern esports. Enter the void.",
    prize: "₹50,000",
    difficulty: "Hard"
  },
  {
    id: 3,
    icon: Brain,
    title: "MIND FLAYER",
    category: "Quiz",
    description: "Tech trivia that bends reality. Only the sharpest minds survive.",
    prize: "₹25,000",
    difficulty: "Expert"
  },
  {
    id: 4,
    icon: Palette,
    title: "PORTAL DESIGN",
    category: "Design",
    description: "Create visuals that transcend dimensions. UI/UX from the upside down.",
    prize: "₹40,000",
    difficulty: "Medium"
  },
  {
    id: 5,
    icon: Mic,
    title: "ECHO CHAMBER",
    category: "Speaking",
    description: "Present your ideas to the void. Let your voice echo through dimensions.",
    prize: "₹30,000",
    difficulty: "Medium"
  },
  {
    id: 6,
    icon: Trophy,
    title: "FINAL BOSS",
    category: "Championship",
    description: "The ultimate showdown. Winners from all events compete for glory.",
    prize: "₹2,00,000",
    difficulty: "Legendary"
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
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

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

                {/* Prize */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-muted-foreground">Prize Pool</span>
                    <div className="text-xl font-display text-primary neon-text-subtle">
                      {event.prize}
                    </div>
                  </div>
                  <NeonButton 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedEvent(event.title)}
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
        eventName={selectedEvent || ''}
      />
    </section>
  );
};

export default EventsSection;
