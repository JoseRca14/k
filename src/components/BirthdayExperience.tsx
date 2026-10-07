import React from 'react'
import { useConfig } from '../context/ConfigContext'
import { HeroSection } from './HeroSection'
import { CounterSection } from './CounterSection'
import { OurStorySection } from './OurStorySection'
import { PhotoStorySection } from './PhotoStorySection'
import { ScrapbookGallerySection } from './ScrapbookGallerySection'
import { SoundtrackSection } from './SoundtrackSection'
import { LetterSection } from './LetterSection'
import { ReasonsSection } from './ReasonsSection'
import { VoiceMessageSection } from './VoiceMessageSection'
import { VideoSection } from './VideoSection'
import { RandomMemorySection } from './RandomMemorySection'
import { RememberThisSection } from './RememberThisSection'
import { CalendarMemoriesSection } from './CalendarMemoriesSection'
import { StatsSection } from './StatsSection'
import { SecretSection } from './SecretSection'
import { SurpriseSection } from './SurpriseSection'
import { LastSurpriseSection } from './LastSurpriseSection'
import { FinalSection } from './FinalSection'
import { EasterEggsSection } from './EasterEggsSection'

export const BirthdayExperience: React.FC = () => {
  const { config } = useConfig()
  const { sectionVisibility } = config

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* Hidden Global Easter Eggs */}
      <EasterEggsSection />

      {/* 01. Hero */}
      {sectionVisibility.hero && (
        <div id="hero">
          <HeroSection />
        </div>
      )}

      {/* 02. Counter */}
      {sectionVisibility.counter && (
        <div id="contador">
          <CounterSection />
        </div>
      )}

      {/* 03. Memories (Our Story) */}
      {sectionVisibility.memories && (
        <div id="historia">
          <OurStorySection />
        </div>
      )}

      {/* 04. Photo Story */}
      {sectionVisibility.photoStory && (
        <div id="foto-historia">
          <PhotoStorySection />
        </div>
      )}

      {/* 05. Scrapbook Gallery */}
      {sectionVisibility.gallery && (
        <div id="galeria">
          <ScrapbookGallerySection />
        </div>
      )}

      {/* 06. Soundtrack Playlist */}
      {sectionVisibility.playlist && (
        <div id="playlist">
          <SoundtrackSection />
        </div>
      )}

      {/* 07. Letter */}
      {sectionVisibility.letter && (
        <div id="carta">
          <LetterSection />
        </div>
      )}

      {/* 08. Reasons */}
      {sectionVisibility.reasons && (
        <div id="razones">
          <ReasonsSection />
        </div>
      )}

      {/* 09. Voice Message */}
      {sectionVisibility.voiceMessage && (
        <div id="audio">
          <VoiceMessageSection />
        </div>
      )}

      {/* 10. Video */}
      {sectionVisibility.video && (
        <div id="video">
          <VideoSection />
        </div>
      )}

      {/* 11. Random Memory */}
      {sectionVisibility.randomMemory && (
        <div id="aleatorio">
          <RandomMemorySection />
        </div>
      )}

      {/* 12. Remember Place (Blurred) */}
      {sectionVisibility.rememberPlace && (
        <div id="acuerdas">
          <RememberThisSection />
        </div>
      )}

      {/* 13. Calendar Memories */}
      {sectionVisibility.calendar && (
        <div id="calendario">
          <CalendarMemoriesSection />
        </div>
      )}

      {/* 14. Stats */}
      {sectionVisibility.stats && (
        <div id="stats">
          <StatsSection />
        </div>
      )}

      {/* 15. Secret Section */}
      {sectionVisibility.secretSection && (
        <div id="secreto">
          <SecretSection />
        </div>
      )}

      {/* 16. Surprise */}
      {sectionVisibility.surprise && (
        <div id="sorpresa">
          <SurpriseSection />
        </div>
      )}

      {/* 17. Last Surprise */}
      {sectionVisibility.lastSurprise && (
        <div id="ultima-sorpresa">
          <LastSurpriseSection />
        </div>
      )}

      {/* 18. Final */}
      {sectionVisibility.final && (
        <div id="final">
          <FinalSection />
        </div>
      )}
    </div>
  )
}
