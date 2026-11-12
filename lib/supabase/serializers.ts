import type { Entity, EntitySource, Officer } from "../data";
import type { LCDA, Ward } from "../lcdaData";
import type { LGA } from "../lgaData";
import type { ServiceNotice } from "../transport/service-notices";

export function serializeEntity(entity: Entity) {
  return {
    p_entity: {
      id: entity.id,
      name: entity.name,
      category: entity.category,
      description: entity.description,
      location: entity.location,
      address: entity.address,
      phone: entity.phone,
      additional_phones: entity.additionalPhones ?? [],
      email: entity.email,
      additional_emails: entity.additionalEmails ?? [],
      website: entity.website ?? null,
      block: entity.block ?? null,
      verified: entity.verified,
      needs_verification: entity.needsVerification,
      last_updated: entity.lastUpdated,
      last_reviewed_at: entity.lastReviewedAt ?? null,
    },
    p_officers: entity.officers.map((officer: Officer) => ({
      name: officer.name,
      title: officer.title,
      phone: officer.phone ?? null,
      email: officer.email ?? null,
      verified: officer.verified ?? false,
    })),
    p_sources: (entity.sources ?? []).map((source: EntitySource) => ({
      label: source.label,
      url: source.url,
      checked_at: source.checkedAt,
      supports: source.supports,
    })),
  };
}

export function serializeLga(lga: LGA) {
  return {
    p_lga: {
      id: lga.id,
      name: lga.name,
      chairman: lga.chairman,
      vice_chairman: lga.viceChairman ?? null,
      address: lga.address,
      phone: lga.phone,
      email: lga.email ?? null,
      zone: lga.zone,
      wards: lga.wards,
      population: lga.population,
      headquarters: lga.headquarters,
      area: lga.area,
      coordinates: lga.coordinates,
      established: lga.established,
      bio: lga.bio,
      history: lga.history,
      landmarks: lga.landmarks,
      known_for: lga.knownFor,
      local_council_development_areas: lga.localCouncilDevelopmentAreas,
      postal_code: lga.postalCode ?? null,
    },
    p_officers: lga.officers,
  };
}

export function serializeLcda(lcda: LCDA) {
  return {
    p_lcda: {
      id: lcda.id,
      name: lcda.name,
      parent_lga_id: lcda.parentLgaId,
      parent_lga_name: lcda.parentLgaName,
      chairman: lcda.chairman,
      vice_chairman: lcda.viceChairman ?? null,
      address: lcda.address,
      phone: lcda.phone,
      email: lcda.email ?? null,
      zone: lcda.zone,
      established: lcda.established,
      headquarters: lcda.headquarters,
      population: lcda.population ?? null,
      area: lcda.area ?? null,
      coordinates: lcda.coordinates,
      bio: lcda.bio,
      known_for: lcda.knownFor,
    },
    p_wards: lcda.wards.map((ward: Ward) => ({
      id: ward.id,
      name: ward.name,
      ...(ward.description ? { description: ward.description } : {}),
    })),
  };
}

export function serializeServiceNotice(notice: ServiceNotice) {
  return {
    id: notice.id,
    type: notice.type,
    title: notice.title,
    body: notice.body,
    affected_lines: notice.affectedLines,
    date: notice.date,
    active: notice.active,
    source_url: notice.sourceUrl ?? null,
    source_label: notice.sourceLabel ?? null,
  };
}
