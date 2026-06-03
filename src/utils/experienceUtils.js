export function calculateTotalDuration(roles) {
  const parseDate = (str) => {
    if (!str) return new Date();
    const s = str.trim().toLowerCase();
    if (s === 'present') return new Date();
    const months = {
      jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
      jul: 6, aug: 7, sept: 8, sep: 8, oct: 9, nov: 10, dec: 11,
    };
    const parts = s.replace(/[–—]/g, '-').split(/\s+/);
    const month = months[parts[0]?.slice(0, 4)] ?? 0;
    const year = parseInt(parts[parts.length - 1], 10) || new Date().getFullYear();
    return new Date(year, month, 1);
  };

  const intervals = roles
    .map((role) => {
      const parts = role.period.split(/\s*[–—-]\s*/);
      if (parts.length !== 2) return null;
      return { start: parseDate(parts[0]), end: parseDate(parts[1]) };
    })
    .filter(Boolean);

  if (intervals.length === 0) return '';

  intervals.sort((a, b) => a.start - b.start);
  const merged = [];
  let current = intervals[0];

  for (let i = 1; i < intervals.length; i++) {
    const next = intervals[i];
    if (next.start <= current.end) {
      if (next.end > current.end) current.end = next.end;
    } else {
      merged.push(current);
      current = next;
    }
  }
  merged.push(current);

  let totalMonths = 0;
  merged.forEach((interval) => {
    const diff =
      (interval.end.getFullYear() - interval.start.getFullYear()) * 12 +
      (interval.end.getMonth() - interval.start.getMonth());
    totalMonths += Math.max(1, diff + 1);
  });

  const years = Math.floor(totalMonths / 12);
  const remMonths = totalMonths % 12;
  if (years > 0) {
    return `${years} yr${years > 1 ? 's' : ''}${remMonths > 0 ? ` ${remMonths} mos` : ''}`;
  }
  return `${totalMonths} mos`;
}

export function groupExperienceByCompany(entries) {
  const sorted = [...entries].sort((a, b) => a.sortOrder - b.sortOrder);
  const groups = {};
  const groupOrder = [];

  sorted.forEach((entry) => {
    const key = entry.groupKey || entry.logoDomain || entry.company;

    if (!groups[key]) {
      groupOrder.push(key);
      groups[key] = {
        company: entry.company,
        website: entry.website,
        logoDomain: entry.logoDomain,
        logos:
          entry.logos ||
          (entry.logoDomain
            ? [
                {
                  domain: entry.logoDomain,
                  company: entry.company,
                  href: entry.website || `https://${entry.logoDomain}`,
                },
              ]
            : []),
        headerSubtitle: entry.companyLine,
        location: entry.location,
        latestYear: entry.year,
        latestMonth: entry.month,
        minSortOrder: entry.sortOrder,
        roles: [],
      };
    }

    groups[key].roles.push(entry);

    if (entry.year > groups[key].latestYear) {
      groups[key].latestYear = entry.year;
      groups[key].latestMonth = entry.month;
      groups[key].location = entry.location;
    } else if (
      entry.year === groups[key].latestYear &&
      entry.month > groups[key].latestMonth
    ) {
      groups[key].latestMonth = entry.month;
      groups[key].location = entry.location;
    }

    if (entry.logos?.length) groups[key].logos = entry.logos;
  });

  const groupArray = groupOrder.map((key) => groups[key]);

  groupArray.forEach((group) => {
    group.totalDuration = calculateTotalDuration(group.roles);
    group.roles.sort((a, b) => a.sortOrder - b.sortOrder);
  });

  return groupArray;
}
