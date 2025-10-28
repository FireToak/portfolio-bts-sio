// Module pour la section des certifications (changement d'année)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.year-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const year = btn.getAttribute('data-year');
      document.querySelectorAll('.year-btn').forEach(b => {
        b.classList.remove('bg-white','text-teal-800','font-bold');
        b.classList.add('text-gray-700');
      });
      btn.classList.add('bg-white','text-teal-800','font-bold');

      document.querySelectorAll('#certifications-year-1, #certifications-year-2').forEach(el => el.classList.add('hidden'));
      const target = document.getElementById(`certifications-year-${year}`);
      if (target) target.classList.remove('hidden');
    });
  });

  const initial = document.querySelector('.year-btn[data-year="2"]');
  if (initial) initial.click();
});

// Module pour la section des épreuves (changement d'épreuves)
  document.querySelectorAll('.epreuves-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const epreuve = btn.getAttribute('data-epreuve');
      document.querySelectorAll('.epreuves-btn').forEach(b => {
        b.classList.remove('bg-white','text-teal-800','font-bold');
        b.classList.add('text-gray-700');
      });
      btn.classList.add('bg-white','text-teal-800','font-bold');

      document.querySelectorAll('#epreuve-5, #epreuve-6').forEach(el => el.classList.add('hidden'));
      const target = document.getElementById(`epreuve-${epreuve}`);
      if (target) target.classList.remove('hidden');
    });
  });

  const initialEpreuve = document.querySelector('.epreuves-btn[data-epreuve="5"]');
  if (initialEpreuve) initialEpreuve.click();