// Sound Effects System for Mulham's Portfolio

// Background music using local file
const BACKGROUND_MUSIC = {
  // Using the local Minecraft music file
  main: 'C418 - Subwoofer Lullaby - Minecraft Volume Alpha.mp3'
};

// Main sound controller class
class SoundController {
  constructor() {
    this.sounds = {};
    this.muted = localStorage.getItem('sound-muted') === 'true';
    this.volume = parseFloat(localStorage.getItem('sound-volume') || '0.3');
    this.initialized = false;

    // Create sound toggle button
    this.createSoundToggle();
  }

  // Initialize sounds (must be called after user interaction)
  init() {
    if (this.initialized) return;

    console.log('Initializing background music system...');

    // Create audio context for better browser compatibility
    this.createAudioContext();

    this.initialized = true;
    this.updateSoundToggleIcon();

    // Start playing background music
    setTimeout(() => {
      this.playBackgroundMusic();
    }, 500);

    // Add debug message
    console.log('Background music system initialized');
  }

  // Create sound toggle button (disabled to avoid duplicate buttons)
  createSoundToggle() {
    // Sound toggle functionality is now handled by the explicit button in index.html
    console.log('Sound toggle button creation skipped - using explicit button instead');
  }

  // Update sound toggle icon (disabled since we removed the toggle)
  updateSoundToggleIcon() {
    // No longer needed since we're using the explicit button
    return;
  }

  // Toggle mute state
  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('sound-muted', this.muted);
    this.updateSoundToggleIcon();

    // Update all sound volumes
    Object.values(this.sounds).forEach(sound => {
      sound.muted = this.muted;
    });
  }

  // Set volume for all sounds
  setVolume(volume) {
    this.volume = volume;
    localStorage.setItem('sound-volume', volume);

    // Update all sound volumes
    Object.values(this.sounds).forEach(sound => {
      sound.volume = volume;
    });
  }

  // Play a sound effect
  play(soundName) {
    if (!this.initialized) {
      this.init();
    }

    // Don't play if muted
    if (this.muted) return;

    try {
      console.log(`Attempting to play sound: ${soundName}`);

      // Try to play the regular sound first
      const sound = this.sounds[soundName];
      if (sound) {
        try {
          // Create a clone to allow overlapping sounds
          const soundClone = sound.cloneNode();
          soundClone.volume = this.volume;

          // Reset to beginning
          soundClone.currentTime = 0;

          // Play with promise handling
          const playPromise = soundClone.play();

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log(`Sound playing: ${soundName}`);
              })
              .catch(error => {
                console.warn(`Sound play failed: ${soundName}, trying fallback...`, error);

                // Try fallback sound
                this.playFallbackSound(soundName);

                // Try to recover by playing on next user interaction
                if (!this.recoveryAttempted) {
                  this.recoveryAttempted = true;

                  // Add one-time click listener to try playing again
                  document.addEventListener('click', () => {
                    console.log('Attempting recovery play after user interaction');

                    // Resume audio context if it exists and is suspended
                    if (this.audioContext && this.audioContext.state === 'suspended') {
                      this.audioContext.resume().then(() => {
                        console.log('AudioContext resumed successfully');
                      });
                    }

                    // Try playing the sound again
                    sound.play().catch(e => {
                      console.error('Recovery play failed:', e);
                    });
                  }, { once: true });
                }
              });
          }
        } catch (e) {
          console.error(`Error playing sound ${soundName}:`, e);
          // Try fallback sound
          this.playFallbackSound(soundName);
        }
      } else {
        // No regular sound, try fallback
        this.playFallbackSound(soundName);
      }
    } catch (e) {
      console.error(`Error in play method for ${soundName}:`, e);
    }
  }

  // Play a fallback sound using Web Audio API
  playFallbackSound(soundName) {
    try {
      // Check if we have fallback sounds
      if (this.fallbackSounds && this.fallbackSounds[soundName]) {
        console.log(`Playing fallback sound for: ${soundName}`);
        return this.fallbackSounds[soundName]();
      }
      return false;
    } catch (e) {
      console.error(`Error playing fallback sound ${soundName}:`, e);
      return false;
    }
  }

  // Background music methods
  playBackgroundMusic() {
    if (!this.initialized) {
      this.init();
    }

    if (this.muted) return;

    try {
      console.log('Attempting to play Minecraft background music');

      // Check if we already have background music
      if (this.backgroundMusic && !this.backgroundMusic.paused) {
        console.log('Background music is already playing');
        return;
      }

      // Get the track URL - using local file
      const trackUrl = BACKGROUND_MUSIC.main;
      console.log(`Using local track: ${trackUrl}`);

      // Create background music element if it doesn't exist
      if (!this.backgroundMusic) {
        this.backgroundMusic = new Audio(trackUrl);
        this.backgroundMusic.volume = this.volume * 0.4; // Set volume for background music
        this.backgroundMusic.loop = true; // Loop the music
        this.backgroundMusic.autoplay = true; // Try to autoplay
        this.backgroundMusic.muted = false;

        // Add event listeners for debugging
        this.backgroundMusic.addEventListener('canplaythrough', () => {
          console.log('Background music can play through');
        });

        this.backgroundMusic.addEventListener('playing', () => {
          console.log('Background music is now playing');
          this.showTrackInfo('Minecraft - C418');
        });

        this.backgroundMusic.addEventListener('error', (e) => {
          console.error('Background music error:', e);
        });
      } else {
        // Make sure the source is set
        if (this.backgroundMusic.src !== trackUrl) {
          this.backgroundMusic.src = trackUrl;
          this.backgroundMusic.load();
        }
      }

      // Play the music with user interaction check
      const playWithUserInteraction = () => {
        console.log('Attempting to play with user interaction');

        // Resume audio context if needed
        if (this.audioContext && this.audioContext.state === 'suspended') {
          this.audioContext.resume().then(() => {
            console.log('Audio context resumed');
          }).catch(e => {
            console.error('Failed to resume audio context:', e);
          });
        }

        // Play the audio
        const playPromise = this.backgroundMusic.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Minecraft background music started playing');
              this.showTrackInfo('Minecraft - C418');
            })
            .catch(error => {
              console.warn('Background music failed to play:', error);

              // Try again with user interaction
              if (!this.musicRecoveryAttempted) {
                this.musicRecoveryAttempted = true;

                // Just try to play again on next user interaction without showing a button
                document.addEventListener('click', () => {
                  console.log('Attempting to recover background music on next user interaction');
                  this.backgroundMusic.play().catch(e => {
                    console.error('Background music recovery failed:', e);
                  });
                }, { once: true });
              }
            });
        }
      };

      // Try to play immediately
      playWithUserInteraction();

    } catch (e) {
      console.error('Error playing background music:', e);
    }
  }

  // Removed the showPlayButton method as it's no longer needed

  // Show track info
  showTrackInfo(trackName) {
    // Remove any existing track info
    const existingTrackInfo = document.querySelector('.now-playing');
    if (existingTrackInfo) {
      existingTrackInfo.remove();
    }

    // Create track info element
    const trackInfo = document.createElement('div');
    trackInfo.className = 'now-playing';

    trackInfo.innerHTML = `
      <div class="now-playing-title">Now Playing</div>
      <div class="now-playing-track">Subwoofer Lullaby</div>
      <div class="now-playing-artist">C418 - Minecraft</div>
    `;

    // Add to document
    document.body.appendChild(trackInfo);

    // Show with animation
    setTimeout(() => {
      trackInfo.classList.add('show');
    }, 100);

    // Hide after delay
    setTimeout(() => {
      trackInfo.classList.remove('show');
      setTimeout(() => {
        trackInfo.remove();
      }, 500);
    }, 5000);
  }

  // Stop background music
  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }

  // Toggle background music
  toggleBackgroundMusic() {
    if (this.backgroundMusic) {
      if (this.backgroundMusic.paused) {
        this.playBackgroundMusic();
      } else {
        this.stopBackgroundMusic();
      }
    } else {
      this.playBackgroundMusic();
    }
  }

  // Create audio context for background music
  createAudioContext() {
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        console.log('Audio context created successfully for background music');
      }
    } catch (e) {
      console.error('Failed to create audio context for background music:', e);
    }
  }
}

// Initialize sound controller and make it globally accessible
const soundController = new SoundController();
window.soundController = soundController; // Make it accessible globally

// Add event listeners for background music
document.addEventListener('DOMContentLoaded', function() {
  // Make the Mulham icon interactive
  const mulhamIcon = document.querySelector('.mulham-icon');
  if (mulhamIcon) {
    // Make icon interactive
    mulhamIcon.style.pointerEvents = 'all';
    mulhamIcon.style.cursor = 'pointer';

    // Toggle music on click
    mulhamIcon.addEventListener('click', () => {
      // If music is playing, stop it, otherwise play it
      if (soundController.backgroundMusic && !soundController.backgroundMusic.paused) {
        soundController.stopBackgroundMusic();
      } else {
        soundController.playBackgroundMusic();
      }

      // Add visual feedback
      const iconGlow = mulhamIcon.querySelector('.icon-glow');
      if (iconGlow) {
        iconGlow.style.background = 'radial-gradient(circle, rgba(127, 90, 240, 0.9) 0%, rgba(127, 90, 240, 0.6) 40%, rgba(127, 90, 240, 0.2) 70%)';
        iconGlow.style.animation = 'glow-pulse 0.5s infinite alternate ease-in-out';

        // Enhance rainbow trail
        const rainbowTrail = mulhamIcon.querySelector('.rainbow-trail');
        if (rainbowTrail) {
          rainbowTrail.style.filter = 'drop-shadow(0 0 15px rgba(127, 90, 240, 0.8))';
        }

        // Reset after a short delay
        setTimeout(() => {
          iconGlow.style.background = 'radial-gradient(circle, rgba(127, 90, 240, 0.6) 0%, rgba(127, 90, 240, 0.3) 40%, rgba(127, 90, 240, 0) 70%)';
          iconGlow.style.animation = 'glow-pulse 2s infinite alternate ease-in-out';

          if (rainbowTrail) {
            rainbowTrail.style.filter = 'drop-shadow(0 0 8px rgba(127, 90, 240, 0.4))';
          }
        }, 500);
      }
    });
  }

  // Music controls removed - music will play automatically
  // and can be toggled by clicking the rainbow cat
});
