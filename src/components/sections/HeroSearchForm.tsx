'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '../icons/Icon';
import type { Destination } from '@/types/api';

export function HeroSearchForm({ destinations }: { destinations: Destination[] }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const fieldRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [];
    return destinations
      .filter(
        (destination) =>
          destination.name.toLowerCase().includes(term) ||
          destination.country.toLowerCase().includes(term),
      )
      .slice(0, 6);
  }, [query, destinations]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (fieldRef.current && !fieldRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function selectDestination(destination: Destination) {
    setQuery(destination.name);
    setSelectedId(destination.id);
    setIsOpen(false);
    setActiveIndex(-1);
  }

  function handleChange(value: string) {
    setQuery(value);
    setSelectedId(null);
    setIsOpen(true);
    setActiveIndex(-1);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!isOpen || matches.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % matches.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? matches.length - 1 : index - 1));
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      selectDestination(matches[activeIndex]);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (selectedId) {
      params.set('destinationId', selectedId);
    } else if (query.trim()) {
      params.set('search', query.trim());
    }
    setIsOpen(false);
    router.push(`/packages?${params.toString()}`);
  }

  function handleClear() {
    setQuery('');
    setSelectedId(null);
    setIsOpen(false);
  }

  const showSuggestions = isOpen && matches.length > 0;

  return (
    <form className="hero-search" onSubmit={handleSubmit} autoComplete="off">
      <div className="hero-search__field" ref={fieldRef}>
        <label className="form-label text-body" htmlFor="search-destination">
          Destination
        </label>
        <div
          className={`input-group hero-search__input-group${showSuggestions ? ' hero-search__input-group--open' : ''}`}
        >
          <span className="input-group-text">
            <Icon name="map-pin" className="icon icon--sm" />
          </span>
          <input
            className="form-control"
            type="text"
            id="search-destination"
            name="search"
            placeholder="Where are you going?"
            value={query}
            onChange={(event) => handleChange(event.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            role="combobox"
            aria-expanded={showSuggestions}
            aria-controls="hero-search-listbox"
            aria-autocomplete="list"
          />
          {query && (
            <button
              type="button"
              className="btn hero-search__clear"
              onClick={handleClear}
              aria-label="Clear destination"
            >
              <Icon name="close" className="icon icon--sm" />
            </button>
          )}
        </div>

        {showSuggestions && (
          <ul className="hero-search__suggestions" id="hero-search-listbox" role="listbox">
            {matches.map((destination, index) => (
              <li key={destination.id} role="option" aria-selected={index === activeIndex}>
                <button
                  type="button"
                  className={`hero-search__suggestion${index === activeIndex ? ' hero-search__suggestion--active' : ''}`}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectDestination(destination)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <Icon name="map-pin" className="icon icon--sm" />
                  <span className="hero-search__suggestion-name">{destination.name}</span>
                  <span className="hero-search__suggestion-country">{destination.country}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" className="btn btn-primary hero-search__submit">
        <Icon name="search" className="icon icon--sm" /> Search
      </button>
    </form>
  );
}
